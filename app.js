const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const db = require('./models').db;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/assets', express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/jquery', express.static('node_modules/jquery/dist'));


app.set('view engine', 'html');
nunjucks.configure('views', { express: app });


app.use('/', routes);

app.use((err, req, res, next) => {
  res.render('error');
  return next();
});


db.sync()
.then(() => {
  app.listen(3000, () => console.log('Server Listening on port 3000'));
});
