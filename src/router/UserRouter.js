const { Router } = require('express');
const userController = require('../controllers/userController');

const UserRouter = Router();

UserRouter.post('/signup', userController.signup);

module.exports = UserRouter;
