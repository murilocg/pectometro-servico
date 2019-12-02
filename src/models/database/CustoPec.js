const CustoPec = (sequelize, DataTypes) => {
  const schema = sequelize.define('custopec', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    custo: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return schema;
};

module.exports = CustoPec;
