const PecAutor = (sequelize, DataTypes) => {
  const schema = sequelize.define('pec_autor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pecId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    autorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return schema;
};

module.exports = PecAutor;
