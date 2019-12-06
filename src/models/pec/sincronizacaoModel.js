const { hashPec, concat, formatarData, getSlicePecIds, precisaAtualizar } = require('./utils');
const pecServiceDb = require('./pecServiceDb');
const pecServiceApi = require('./pecServiceApi');

class SincronizacaoModel {
  async sincronizar() {
    const dataSincronizacao = await pecServiceDb.obtemDataSincronizacao();
    if (!dataSincronizacao) return await this.copiarBasedeDados();
    if (precisaAtualizar(dataSincronizacao))
      return await this.atualizarBasedeDados(dataSincronizacao);
  }

  async atualizarBasedeDados(dataSincronizacao) {
    const getAllPecs = async () => {
      return await pecServiceApi.pesquisarPecs({
        siglaTipo: 'PEC',
        dataInicio: formatarData(dataSincronizacao)
      });
    };
    const getAllAutores = async pecs => await this.listaAutoresPorPec(pecs.map(p => p.id));
    await this.update(getAllPecs, getAllAutores);
    await this.atualizarDataSincronizacao();
  }

  async copiarBasedeDados() {
    await pecServiceDb.truncate();
    const start = 1988;
    const end = 2019;
    let count = start;
    do {
      const listaPecs = async () => await pecServiceApi.listaPecPorAno(count);
      const listaAutores = async pecs =>
        await pecServiceApi.listaAutoresPorAno(count, hashPec(pecs));
      await this.update(listaPecs, listaAutores);
      count++;
    } while (count <= end);
    await this.atualizarDataSincronizacao();
  }

  async listaAutoresPorPec(pecIds) {
    const max = Math.ceil(pecIds.length / 25);
    const autores = [];
    let i = 0;
    while (i < max) {
      const ids = getSlicePecIds(pecIds, max, 25, i);
      const data = await Promise.all(ids.map(pecServiceApi.pesquisarAutor));
      concat(autores, data);
      i++;
      await sleep(3000);
    }
    return autores;
  }

  async update(getAllPecs, getAllAutores) {
    const pecs = await getAllPecs();
    await pecServiceDb.inserirListaPec(pecs);
    const autores = await getAllAutores(pecs);
    await this.inserirListaAutores(autores);
  }

  async atualizarDataSincronizacao() {
    const dataSincronizacao = new Date();
    return await pecServiceDb.atualizarDataSincronizacao(dataSincronizacao);
  }

  async inserirListaAutores(autores) {
    const { hashAutor, hashPec } = this.criarHashAutor(autores);
    const list = await pecServiceDb.inserirListaAutores(Object.values(hashAutor));
    await pecServiceDb.inserirListaAutorPec(this.gerarListaAutorPec(list, hashPec));
  }

  gerarListaAutorPec(autores, hashPec) {
    const listaAutorPec = [];
    autores.forEach(a => {
      const pecIds = hashPec[a.nome];
      pecIds.forEach(pecId => listaAutorPec.push({ autorId: a.id, pecId }));
    });
    return listaAutorPec;
  }

  criarHashAutor(autores) {
    const hashAutor = {};
    const hashPec = {};
    autores.forEach(a => {
      hashAutor[a.nome] = a;
      if (hashPec[a.nome]) hashPec[a.nome].push(a.pecId);
      else hashPec[a.nome] = [a.pecId];
    });
    return { hashPec, hashAutor };
  }
}

module.exports = new SincronizacaoModel();
