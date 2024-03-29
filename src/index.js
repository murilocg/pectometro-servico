const app = require('./app');
const { DB } = require('./models');
const port = 4200;
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  DB.init();
  return console.log(`server is listening on ${port}`);
});
