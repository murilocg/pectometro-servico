const { tratarTermoDeBusca } = require('./utils');
const sincronizacaoModel = require('./sincronizacaoModel');
const pecServiceDb = require('./pecServiceDb');
const pecServiceApi = require('./pecServiceApi');

class PecModel {
  async sincronizar() {
    await sincronizacaoModel.sincronizar();
  }

  async getPecs(filter) {
    const pecs = await pecServiceApi.pesquisarPecs(filter);
    const autores = await pecServiceApi.getAutores(pecs.map(p => p.id));
    return { pecs, autores };
  }

  async pesquisar(termo) {
    this.sincronizar();
    termo = tratarTermoDeBusca(termo);
    if (Number(termo)) return await pecServiceDb.getPecsPorNumero(Number(termo));
    return await pecServiceDb.filtrar(termo);
  }

  async getCustoPec() {
    return await pecServiceDb.getCustoPec();
  }

  async atualizarCustoPec(custo) {
    await pecServiceDb.atualizarCustoPec(custo);
  }

  async getComentarios(pecId) {
    return await pecServiceDb.getComentarios(pecId);
  }

  async criarComentario(comentario) {
    return await pecServiceDb.criarComentario(comentario);
  }
}

module.exports = new PecModel();
