const auth = require('../../utils/auth');
const UsuarioModel = require('../user/UsuarioModel');

class AuthModel {
  constructor() {
    this.usuarioModel = new UsuarioModel();
  }

  async login(email, senha) {
    const usuario = await this.usuarioModel.obtemUsuarioPorEmail(email);
    if (!usuario) throw new Error(`Senha ou email inválidos`);
    const senhaCorreta = await auth.verificarSenha(usuario.senha, senha);
    if (!senhaCorreta) throw new Error('Senha ou email inválidos');
    const token = auth.sign(usuario.id, usuario.tipo);
    return { usuario, token };
  }
}

module.exports = new AuthModel();
