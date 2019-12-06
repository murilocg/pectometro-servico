const { pecModel } = require('../models');

class PecController {
  async pesquisar(req, res) {
    try {
      const { termo } = req.query;
      const pecs = await pecModel.pesquisar(termo);
      return res.send({ pecs });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
  async sincronizar(req, res) {
    try {
      pecModel.sincronizar();
      return res.send({ message: 'Sincronizado com sucesso!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
  async atualizarCustoPec(req, res) {
    try {
      const { custo } = req.body;
      await pecModel.atualizarCustoPec(custo);
      res.status(200).send({ message: 'custo por Pec atualizado com sucesso!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async getCustoPec(req, res) {
    try {
      const custo = await pecModel.getCustoPec();
      res.status(200).send(custo);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async getComentarios(req, res) {
    try {
      const { pecId } = req.params;
      const comentarios = await pecModel.getComentarios(Number(pecId));
      res.status(200).send(comentarios);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }

  async criarComentario(req, res) {
    try {
      const { pecId } = req.params;
      const comentario = req.body;
      const comentarioCriado = await pecModel.criarComentario({
        ...comentario,
        pecId: Number(pecId)
      });
      res.status(200).send(comentarioCriado);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
}
module.exports = new PecController();
