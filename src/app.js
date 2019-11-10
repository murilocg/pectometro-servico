const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./router/UserRouter');
const PecRouter = require('./router/PecRouter');
const AuthMiddleware = require('./middlewares/authMiddleware');

const app = express();
const router = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users/', router, UserRouter);
app.use('/pecs/', router, PecRouter);
// app.use(router, AuthMiddleware);
module.exports = app;
