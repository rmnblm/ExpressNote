const express = require('express');
const morgan = require('morgan');
const hbs = require('express-hbs');
const session = require('express-session');

const app = express();

app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(require('body-parser').urlencoded({
  extended: false,
}));

app.use(session({
  secret: '1234567',
  resave: false,
  saveUninitialized: true,
}));

app.use(require('method-override')((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
  return undefined;
}));

app.engine('hbs', hbs.express4({
  defaultLayout: `${__dirname}/views/layouts/default.hbs`,
  partialsDir: `${__dirname}/views/partials`,
  layoutsDir: `${__dirname}/views/layouts`,
}));
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

hbs.registerHelper(require('./helpers/hbsHelpers'));

app.use(require('./routes/indexRoutes'));
app.use(require('./routes/notesRoutes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => console.log(`Server is running at http://${hostname}:${port}`));
