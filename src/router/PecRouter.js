const { Router } = require('express');
const pecController = require('../controllers/pecController');
const auth = require('../utils/auth');

const pecRouter = Router();
pecRouter.get('/', pecController.pesquisar);
pecRouter.post('/sincronizar', auth.validateJwtAdmin, pecController.sincronizar);

module.exports = pecRouter;
