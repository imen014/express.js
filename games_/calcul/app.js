var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
const mysql = require('mysql');


var app = express();
// Configuration de la connexion à MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydatabase',
});

// Connexion à MySQL
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL : ', err);
  } else {
    console.log('Connecté à MySQL');
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.urlencoded({ extended: true }));


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

app.get('/calcul', (req,res) => {
  res.render('calcul');
});

app.post('/calculT', (req,res) => {
  const number1 = parseFloat(req.body.number1);
  const number2 = parseFloat(req.body.number2);
  const operation = req.body.operation;

const calculator1 = new  CalculatorController(number1,number2,operation);
result = calculator1.calculate();
res.render('result', { result });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  

module.exports = app;