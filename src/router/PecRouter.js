const { Router } = require('express');
const pecController = require('../controllers/pecController');

const PecRouter = Router();

PecRouter.get('/', pecController.pesquisar);
PecRouter.post('/sincronizar', pecController.sincronizar);

module.exports = PecRouter;
