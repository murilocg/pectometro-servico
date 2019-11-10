const { userModel } = require('../models');

class UserController {
  async signup(req, res) {
    try {
      const { user } = req.body;

      const userExists = await userModel.findUserByEmail(user.email);

      if (userExists)
        return res.status(400).send({ error: 'Já existe um usuário com este email.' });

      const userCreated = await userModel.createUser(user);

      return res.send({ user: userCreated });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}
module.exports = new UserController();
