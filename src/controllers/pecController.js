const { pecModel } = require('../models');

class PecController {
  async pesquisar(req, res) {
    try {
      const { termo } = req.query;
      const pecs = await pecModel.pesquisar(termo);
      return res.send({ pecs });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  async sincronizar(req, res) {
    try {
      await pecModel.sincronizar();
      return res.send({ message: 'Sincronizado com sucesso!' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  }
}
module.exports = new PecController();
