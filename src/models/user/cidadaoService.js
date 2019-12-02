const DB = require('../database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class CidadaoService {
  constructor() {
    this.Cidadao = DB.Cidadao;
  }

  async obtemUsuarioPorEmail(email) {
    const cidadao = await this.Cidadao.findOne({
      where: { [Op.and]: Sequelize.literal(`usuario.email = '${email}'`) },
      include: [{ model: DB.Usuario }]
    });
    return cidadao;
  }

  async criarCidadao(cidadao) {
    const cidadaoCriado = await this.Cidadao.create(cidadao);
    return cidadaoCriado;
  }
}

module.exports = new CidadaoService();
