const usuarioService = require('./usuarioService');

class UsuarioModel {
  async obtemUsuarioPorEmail(email) {
    return await usuarioService.obtemUsuarioPorEmail(email);
  }

  async criarUsuario(usuario) {
    const { email } = usuario;
    const usuarioExiste = await this.obtemUsuarioPorEmail(email);
    if (usuarioExiste) throw new Error(`Já existe um Usuário com o email ${email}`);
    return usuarioService.criarUsuario(usuario);
  }
}
module.exports = UsuarioModel;
