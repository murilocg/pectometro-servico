const bcrypt = require('bcryptjs');

const UserSchema = (sequelize, DataTypes) => {
  const schema = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  schema.beforeSave(async user => {
    if (user.senha) user.senha = await bcrypt.hash(user.senha, 8);
  });

  return schema;
};

module.exports = UserSchema;
