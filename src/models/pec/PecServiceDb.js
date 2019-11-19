const DB = require('../database');
const { parseAutor } = require('./utils');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class PecServiceDb {
  constructor() {
    this.Pec = DB.Pec;
    this.Autor = DB.Autor;
    this.PecAutor = DB.PecAutor;
  }

  async truncate() {
    await this.Pec.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.Autor.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.PecAutor.destroy({ truncate: true, cascade: true, restartIdentity: true });
  }

  criarMapAutor(autores) {
    const mapAutor = {};
    autores.forEach(a => {
      if (mapAutor[a.nome]) mapAutor[a.nome].push(a.pecId);
      else mapAutor[a.nome] = [a.pecId];
    });
    return mapAutor;
  }

  async criarPecAutores(autores, mapAutor) {
    const pecAutores = [];
    for (const autor of autores) {
      const pecIds = mapAutor[autor.nome];
      pecIds.forEach(pecId => pecAutores.push({ pecId, autorId: autor.id }));
    }
    await this.PecAutor.bulkCreate(pecAutores);
  }

  async insertAutores(autores) {
    const mapAutor = {};
    autores.forEach(a => (mapAutor[a.nome] = a));
    return await this.createAutores(Object.keys(mapAutor).map(k => mapAutor[k]));
  }

  async insertAll(pecs, autores) {
    await this.Pec.bulkCreate(pecs);
    const mapAutor = this.criarMapAutor(autores);
    const autoresCriados = await this.insertAutores(autores);
    await this.criarPecAutores(autoresCriados, mapAutor);
  }

  async createAutores(autores) {
    const data = await this.Autor.bulkCreate(autores);
    return data.map(parseAutor);
  }

  async filtrar(termo) {
    const termos = termo.split(' ');
    const or = [];
    termos.forEach(t => or.push({ ementa: { [Op.like]: `%${t}%` } }));
    termos.forEach(t => or.push(Sequelize.literal(`autors.nome LIKE '%${t}%'`)));
    const data = await this.Pec.findAll({
      where: { [Op.or]: or },
      include: [{ model: DB.Autor }]
    });
    return data;
  }

  async getPecsPorNumero(numero) {
    const data = await this.Pec.findAll({
      where: { numero },
      include: [{ model: DB.Autor }]
    });
    return data;
  }
}

module.exports = new PecServiceDb();
