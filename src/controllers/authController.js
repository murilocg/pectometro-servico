const { authModel } = require('../models');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const session = await authModel.login(email, senha);
      return res.send({ session });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
module.exports = new AuthController();
