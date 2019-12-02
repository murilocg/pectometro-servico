const Cidadao = (sequelize, DataTypes) => {
  const schema = sequelize.define('cidadao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return schema;
};

module.exports = Cidadao;
