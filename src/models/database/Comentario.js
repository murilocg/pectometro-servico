const Comentario = (sequelize, DataTypes) => {
  const schema = sequelize.define('comentario', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return schema;
};

module.exports = Comentario;
