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

//connexion bd
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sahar',
  password: 'sahar123',
  database: 'express_crud1',
});

// function
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL en tant que ID ' + db.threadId);
});

app.get('/utilisateurs', (req,res) => {
  res.render('creation_tilisateur');
});

app.post('/utilisateurs', (req,res) => {
  const {nom, email} = req.body;

  if(!nom || !email) {
    return res.status(400).json({ 'nom et email sont requis' });
  }

  const sql = 'insert into utilisateurs(username,email)values(?,?)';
  db.query(sql, [nom,email], (err, result) => {
    if(err){
      console.error('error lors de l\'ajput de l\'utilisateur :', err);
      return res.status(500).json({ message: 'erreur lors de l\'ajout de l\'utilisateur' });
    }
    console.log('utilisateur ajouté avec succés !');
    res.status(201).json({ message: 'utilisateur ajouté avec succés !' });
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
