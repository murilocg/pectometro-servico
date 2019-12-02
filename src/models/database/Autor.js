const Autor = (sequelize, DataTypes) => {
  const schema = sequelize.define('autor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true
    },
    tipo: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  });
  return schema;
};

module.exports = Autor;
