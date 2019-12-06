const DB = require('../database');
const { parseAutor, parseComentarios } = require('./utils');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class PecServiceDb {
  constructor() {
    this.Pec = DB.Pec;
    this.Autor = DB.Autor;
    this.PecAutor = DB.PecAutor;
    this.CustoPec = DB.CustoPec;
    this.Comentario = DB.Comentario;
    this.Sincronizacao = DB.Sincronizacao;
  }

  async truncate() {
    await this.Pec.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.Autor.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.PecAutor.destroy({ truncate: true, cascade: true, restartIdentity: true });
  }

  async inserirListaPec(pecs) {
    await this.Pec.bulkCreate(pecs);
  }

  async inserirListaAutores(autores) {
    return await this.Autor.bulkCreate(autores, {
      updateOnDuplicate: ['nome']
    });
  }

  async inserirListaAutorPec(listaAutorPec) {
    await this.PecAutor.bulkCreate(listaAutorPec);
  }

  async atualizarDataSincronizacao(dataSincronizacao) {
    await this.Sincronizacao.create({ dataSincronizacao });
  }

  async filtrar(termo) {
    const termos = termo.split(' ');
    const or = [];
    termos.forEach(t => or.push(Sequelize.literal(`unaccent(pec.ementa) LIKE '%${t}%'`)));
    termos.forEach(t => or.push(Sequelize.literal(`unaccent(autors.nome) LIKE '%${t}%'`)));
    const data = await this.Pec.findAll({
      where: termo !== '' ? { [Op.or]: or } : undefined,
      order: [
        ['ano', 'DESC'],
        ['numero', 'DESC']
      ],
      limit: termo === '' ? 50 : undefined,
      include: [{ model: DB.Autor }]
    });
    return data;
  }

  async getPecsPorNumero(numero) {
    const data = await this.Pec.findAll({
      where: { numero },
      order: [['ano', 'DESC']],
      include: [{ model: DB.Autor }]
    });
    return data;
  }

  async getCustoPec() {
    return await this.CustoPec.findOne({ limit: 1 });
  }

  async atualizarCustoPec(custo) {
    const custoPec = await this.getCustoPec();
    if (!custoPec) await this.CustoPec.create({ custo });
    else await this.CustoPec.update({ custo }, { where: { id: custoPec.id } });
  }

  async getComentarios(pecId) {
    const comentarios = await this.Comentario.findAll({
      where: { pecId },
      order: [['createdAt', 'DESC']],
      include: [{ model: DB.Usuario }]
    });
    return parseComentarios(comentarios);
  }

  async obtemDataSincronizacao() {
    const sincronizacao = await this.Sincronizacao.findOne({
      limit: 1,
      order: [['dataSincronizacao', 'DESC']]
    });
    return sincronizacao ? sincronizacao.dataSincronizacao : undefined;
  }

  async criarComentario(comentario) {
    return await this.Comentario.create(comentario);
  }
}

module.exports = new PecServiceDb();
