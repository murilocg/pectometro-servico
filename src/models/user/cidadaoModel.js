const cidadaoService = require('./cidadaoService');
const UsuarioModel = require('./UsuarioModel');

class CidadaoModel extends UsuarioModel {
  async criarUsuario(dados) {
    const usuarioCriado = await super.criarUsuario({ ...dados, tipo: 'cidadao' });
    const usuarioId = usuarioCriado.id;
    const cidadao = await cidadaoService.criarCidadao({ ...dados, usuarioId });
    return cidadao;
  }

  async obtemUsuarioPorEmail(email) {
    return await cidadaoService.obtemUsuarioPorEmail(email);
  }
}
module.exports = new CidadaoModel();
