const Sequelize = require('sequelize');
const config = require('./sequelizeconfig.json');

class DB {
  constructor() {
    this.sequelize = new Sequelize(config.database, config.user, config.password, config);
    // this.UserSchema = this.sequelize.import('../user/UserSchema');
    // this.CidadaoSchema = this.sequelize.import('../user/CidadaoSchema');
    // this.ProfissaoSchema = this.sequelize.import('../user/ProfissaoSchema');
    this.PecSchema = this.sequelize.import('../pec/PecSchema');
    this.AutorSchema = this.sequelize.import('../autor/AutorSchema');
    this.PecAutorSchema = this.sequelize.import('../pec/PecAutorSchema');
    this.PecSchema.belongsToMany(this.AutorSchema, {
      through: this.PecAutorSchema,
      foreignKey: 'pecId'
    });
    this.AutorSchema.belongsToMany(this.PecSchema, {
      through: this.PecAutorSchema,
      foreignKey: 'autorId'
    });
    // this.PecSchema.hasMany(this.AutorSchema);
    // this.UserSchema.hasOne(this.CidadaoSchema);
    // this.ProfissaoSchema.hasOne(this.CidadaoSchema);
  }

  async init() {
    await this.sequelize.sync();
  }
}

module.exports = new DB();
