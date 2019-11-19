const { Router } = require('express');
const adminController = require('../controllers/adminController');
const cidadaoController = require('../controllers/cidadaoController');
const auth = require('../utils/auth');

const userRouter = Router();
userRouter.use(auth.validateJwtAdmin);
userRouter.post('/admin', adminController.criarAdmin);
userRouter.post('/cidadao', cidadaoController.criarCidadao);

module.exports = userRouter;
