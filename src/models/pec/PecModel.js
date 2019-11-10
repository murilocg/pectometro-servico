const { tratarTermoDeBusca } = require('./utils');
const pecServiceDb = require('./PecServiceDb');
// const autorModel = require('../autor/AutorModel');
const pecServiceApi = require('./PecServiceApi');

class PecModel {
  async sincronizar() {
    await pecServiceDb.truncate();
    const pecs = await this.getAllPecs();
    const autores = await pecServiceApi.getAutores(pecs.map(p => p.id));
    await pecServiceDb.insertAll(pecs, autores);
  }

  async getAllPecs() {
    const pecs = [];
    const filter = { siglaTipo: 'PEC', pagina: 1, itens: 100, ordenarPor: 'id', ordem: 'ASC' };
    let dados = await pecServiceApi.pesquisarPecs(filter);
    while (dados.length) {
      filter.pagina++;
      dados.forEach(d => pecs.push(d));
      dados = await pecServiceApi.pesquisarPecs(filter);
    }
    return pecs;
  }

  async getPecs(filter) {
    const pecs = await pecServiceApi.pesquisarPecs(filter);
    const autores = await pecServiceApi.getAutores(pecs.map(p => p.id));
    return { pecs, autores };
  }

  async pesquisar(termo) {
    termo = tratarTermoDeBusca(termo);
    if (Number(termo)) return await pecServiceDb.getPecsPorNumero(Number(termo));
    return await pecServiceDb.filtrar(termo);
  }
}

module.exports = new PecModel();
