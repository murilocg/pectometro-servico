const DB = require('../database');

class UsuarioService {
  constructor() {
    this.Usuario = DB.Usuario;
  }

  async obtemUsuarioPorEmail(email) {
    const usuario = await this.Usuario.findOne({ where: { email } });
    return usuario;
  }

  async criarUsuario(usuario) {
    const usuarioCriado = await this.Usuario.create(usuario);
    return usuarioCriado;
  }
}

module.exports = new UsuarioService();
