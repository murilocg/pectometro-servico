const UsuarioModel = require('./usuarioModel');

class CidadaoModel extends UsuarioModel {
  async criarUsuario(usuario) {
    const administrador = await super.criarUsuario({ ...usuario, tipo: 'admin' });
    return administrador;
  }
}
module.exports = new CidadaoModel();
