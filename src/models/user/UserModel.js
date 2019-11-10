const DB = require('../database');

class UserModel {
  async createUser(user) {
    const result = await DB.UserSchema.create(user);
    return result.dataValues;
  }

  async findUserByEmail(email) {
    const result = await DB.UserSchema.findOne({ where: { email } });
    if (result === null) {
      return undefined;
    }
    return result.dataValues;
  }
}

module.exports = new UserModel();
