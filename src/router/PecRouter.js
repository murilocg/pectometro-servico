const { Router } = require('express');
const pecController = require('../controllers/pecController');
const auth = require('../utils/auth');

const pecRouter = Router();
pecRouter.get('/', pecController.pesquisar);
pecRouter.post('/sincronizar', pecController.sincronizar);
pecRouter.post('/custo', auth.validateJwtAdmin, pecController.atualizarCustoPec);
pecRouter.get('/custo', pecController.getCustoPec);
pecRouter.post('/:pecId/comentarios', auth.validateJwtCidadao, pecController.criarComentario);
pecRouter.get('/:pecId/comentarios', pecController.getComentarios);
module.exports = pecRouter;
