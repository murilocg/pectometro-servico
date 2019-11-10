const ProfissaoSchema = (sequelize, DataTypes) => {
  const schema = sequelize.define('profissao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return schema;
};

module.exports = ProfissaoSchema;
