const { montarQuery, parsePec, getIdDeputado } = require('./utils');
const axios = require('axios');
const constantes = require('./constantes');

class PecServiceApi {
  async pesquisarPecs(filter) {
    const url = montarQuery(`${constantes.URL_API_PEC}/proposicoes`, filter);
    const response = await axios.get(url);
    return response.data.dados.map(parsePec);
  }

  async listaPecPorAno(ano) {
    const url = `https://dadosabertos.camara.leg.br/arquivos/proposicoes/json/proposicoes-${ano}.json`;
    try {
      const response = await axios.get(url);
      const pecs = response.data.dados.filter(p => p.siglaTipo === 'PEC');
      return pecs.map(parsePec);
    } catch (e) {
      return [];
    }
  }

  async listaAutoresPorAno(ano, hash) {
    const url = `https://dadosabertos.camara.leg.br/arquivos/proposicoesAutores/json/proposicoesAutores-${ano}.json`;
    try {
      const response = await axios.get(url);
      const autores = response.data.dados.filter(p => hash[p.idProposicao] !== undefined);
      return autores.map(a => ({
        nome: a.nomeAutor,
        tipo: a.tipoAutor,
        pecId: a.idProposicao
      }));
    } catch (e) {
      return [];
    }
  }

  async pesquisarAutor(pecId) {
    const response = await axios.get(`${constantes.URL_API_PEC}/proposicoes/${pecId}/autores`);
    return response.data.dados.map(a => ({
      id: getIdDeputado(a.uri),
      nome: a.nome,
      tipo: a.tipo,
      pecId
    }));
  }
}

module.exports = new PecServiceApi();
