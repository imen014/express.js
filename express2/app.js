var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sahar',
  password: 'sahar123',
  database: 'express',
});

// Connectez-vous à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL en tant que ID ' + db.threadId);
});

// Route pour afficher tous les éléments
app.get('/users', (req, res) => {
  db.query('select * from users1;', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Route pour afficher un élément par ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users1 WHERE id = ?', [userId], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});
app.get('/create_user', (req,res) => {
  res.render('create_user');
});

// Route pour créer un nouvel élément
app.post('/create_user', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  db.query('INSERT INTO users1 SET(nom_utilisateur, email)values(?,?)', username, email, (err, result) => {
    if (err) throw err;
    //newUser.id = result.insertId;
    //res.json(newItem);
    res.json(username, email);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
