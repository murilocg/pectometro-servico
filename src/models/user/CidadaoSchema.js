const CidadaoSchema = (sequelize, DataTypes) => {
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
    data_nascimento: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return schema;
};

module.exports = CidadaoSchema;
