const bcrypt = require('bcryptjs');

const Usuario = (sequelize, DataTypes) => {
  const schema = sequelize.define('usuario', {
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

  schema.beforeSave(async usuario => {
    if (usuario.senha) usuario.senha = await bcrypt.hash(usuario.senha, 8);
  });

  return schema;
};

module.exports = Usuario;
