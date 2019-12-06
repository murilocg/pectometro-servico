const Sequelize = require('sequelize');
const config = require('./sequelizeconfig.json');

class DB {
  constructor() {
    this.sequelize = new Sequelize(config.database, config.user, config.password, config);
    this.Usuario = this.sequelize.import('./Usuario');
    this.Cidadao = this.sequelize.import('./Cidadao');
    this.Pec = this.sequelize.import('./Pec');
    this.Autor = this.sequelize.import('./Autor');
    this.PecAutor = this.sequelize.import('./PecAutor');
    this.CustoPec = this.sequelize.import('./CustoPec');
    this.Comentario = this.sequelize.import('./Comentario');
    this.Sincronizacao = this.sequelize.import('./Sincronizacao');
    this.Pec.belongsToMany(this.Autor, {
      through: this.PecAutor,
      foreignKey: 'pecId'
    });
    this.Autor.belongsToMany(this.Pec, {
      through: this.PecAutor,
      foreignKey: 'autorId'
    });
    this.Cidadao.belongsTo(this.Usuario, { foreignKey: 'usuarioId' });
    this.Comentario.belongsTo(this.Usuario, { foreignKey: 'usuarioId' });
    this.Comentario.belongsTo(this.Pec, { foreignKey: 'pecId' });
  }

  async init() {
    await this.sequelize.sync();
  }
}

module.exports = new DB();
