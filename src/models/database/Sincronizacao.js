const Sincronizacao = (sequelize, DataTypes) => {
  const schema = sequelize.define('sincronizacao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dataSincronizacao: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  return schema;
};

module.exports = Sincronizacao;
