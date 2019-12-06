const { cidadaoModel } = require('../models');

class CidadaoController {
  async criarCidadao(req, res) {
    try {
      const usuario = req.body;
      const cidadao = await cidadaoModel.criarUsuario(usuario);
      return res.send({ cidadao });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
module.exports = new CidadaoController();
