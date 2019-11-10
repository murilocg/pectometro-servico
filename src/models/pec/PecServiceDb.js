const DB = require('../database');
const { flat, parseAutor } = require('./utils');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

class PecServiceDb {
  constructor() {
    this.PecSchema = DB.PecSchema;
    this.AutorSchema = DB.AutorSchema;
    this.PecAutorSchema = DB.PecAutorSchema;
  }

  async truncate() {
    await this.PecSchema.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.AutorSchema.destroy({ truncate: true, cascade: true, restartIdentity: true });
    await this.PecAutorSchema.destroy({ truncate: true, cascade: true, restartIdentity: true });
  }

  criarMapAutor(autores) {
    const mapAutor = {};
    autores.forEach(a => {
      if (mapAutor[a.nome]) mapAutor[a.nome].push(a.pecId);
      else mapAutor[a.nome] = [a.pecId];
    });
    console.log(mapAutor);
    return mapAutor;
  }

  async criarPecAutores(autores, mapAutor) {
    const pecAutores = [];
    for (const autor of autores) {
      const pecIds = mapAutor[autor.nome];
      pecIds.forEach(pecId => pecAutores.push({ pecId, autorId: autor.id }));
    }
    await this.PecAutorSchema.bulkCreate(pecAutores);
  }

  async insertAutores(autores) {
    const mapAutor = {};
    autores.forEach(a => (mapAutor[a.nome] = a));
    return await this.createAutores(Object.keys(mapAutor).map(k => mapAutor[k]));
  }

  async insertAll(pecs, autores) {
    await this.PecSchema.bulkCreate(pecs);
    const mapAutor = this.criarMapAutor(autores);
    const autoresCriados = await this.insertAutores(autores);
    await this.criarPecAutores(autoresCriados, mapAutor);
  }

  async createAutores(autores) {
    const data = await this.AutorSchema.bulkCreate(autores);
    return data.map(parseAutor);
  }

  async filtrar(termo) {
    const termos = termo.split(' ');
    const or = [];
    termos.forEach(t => or.push({ ementa: { [Op.like]: `%${t}%` } }));
    termos.forEach(t => or.push(Sequelize.literal(`autors.nome LIKE '%${t}%'`)));
    const data = await this.PecSchema.findAll({
      where: { [Op.or]: or },
      include: [{ model: DB.AutorSchema }]
    });
    return data;
  }

  async getPecsPorNumero(numero) {
    const data = await this.PecSchema.findAll({
      where: { numero },
      include: [{ model: DB.AutorSchema }]
    });
    return data;
  }
}

module.exports = new PecServiceDb();
