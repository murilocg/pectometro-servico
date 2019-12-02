const { adminModel } = require('../models');

class AdminController {
  async criarAdmin(req, res) {
    try {
      const usuario = req.body;
      const admin = await adminModel.criarUsuario(usuario);
      return res.send({ admin });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
module.exports = new AdminController();
