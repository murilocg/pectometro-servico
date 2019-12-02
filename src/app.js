const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouter');
const pecRouter = require('./router/pecRouter');
const authRouter = require('./router/authRouter');

const app = express();
const router = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth/', router, authRouter);
app.use('/usuarios/', router, userRouter);
app.use('/pecs/', router, pecRouter);

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') res.status(err.status).send({ message: err.message });
  else next();
});
module.exports = app;
