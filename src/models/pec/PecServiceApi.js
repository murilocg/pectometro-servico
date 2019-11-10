const { montarQuery, parsePec, parseAutor, flat, sleep } = require('./utils');
const Sequelize = require('sequelize');
const axios = require('axios');
const constantes = require('./constantes');

const Op = Sequelize.Op;

class PecServiceApi {
  async getAllPecs() {
    const pecs = [];
    const filter = { siglaTipo: 'PEC', pagina: 1, itens: 100, ordenarPor: 'id', ordem: 'ASC' };
    let dados = await this.pesquisarPecs(filter);
    while (dados.length) {
      console.log(dados);
      dados.forEach(p => pecs.push(p));
      filter.pagina++;
      dados = await this.pesquisarPecs(filter);
    }
    return pecs;
  }

  async pesquisarPecs(filter) {
    const url = montarQuery(`${constantes.URL_API_PEC}/proposicoes`, filter);
    const response = await axios.get(url);
    return response.data.dados.map(parsePec);
  }

  async getAutores(pecIds) {
    const max = Math.ceil(pecIds.length / 25);
    const result = [];
    let i = 0;
    while (i < max) {
      let ids;
      const start = i * 25;
      if (i === max - 1) ids = pecIds.slice(start);
      else ids = pecIds.slice(start, start + 25);
      i++;
      const promises = ids.map(this.pesquisarAutor);
      const data = await Promise.all(promises);
      data.forEach(d => result.push(d));
      await sleep(3000);
    }
    console.log(result.length);
    return flat(result);
  }

  async pesquisarAutor(pecId) {
    const response = await axios.get(`${constantes.URL_API_PEC}/proposicoes/${pecId}/autores`);
    return response.data.dados.map(d => ({ ...parseAutor(d), pecId }));
  }
}

module.exports = new PecServiceApi();
