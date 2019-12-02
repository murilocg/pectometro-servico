const jwt = require('jsonwebtoken');
const authConfig = require('../authConfig');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const getToken = req => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new Error('Token inválido');
  const token = authHeader.split(' ')[1];
  return token;
};
const validateJwtAdmin = async (req, res, next) => {
  try {
    const token = getToken(req);
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    if (decoded.tipo !== 'admin') throw new Error('Usuário não autorizado');
    req.body.user = { id: decoded.id, tipo: decoded.tipo };
    next();
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

const validateJwtCidadao = async (req, res, next) => {
  try {
    const token = getToken(req);
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.body.user = { id: decoded.id, tipo: decoded.tipo };
    next();
  } catch (e) {
    res.status(401).send();
  }
};

const verificarSenha = async (hash, senha) => {
  const senhaCorreta = await bcrypt.compare(senha, hash);
  return senhaCorreta;
};

const sign = (id, tipo) => {
  const token = jwt.sign({ id, tipo }, authConfig.secret, {
    expiresIn: authConfig.expiresIn
  });
  return token;
};

module.exports = {
  validateJwtAdmin,
  validateJwtCidadao,
  verificarSenha,
  sign
};
