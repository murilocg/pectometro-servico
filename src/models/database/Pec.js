const Pec = (sequelize, DataTypes) => {
  const schema = sequelize.define('pec', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ementa: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });
  return schema;
};

module.exports = Pec;
