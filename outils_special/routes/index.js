var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'sahar',
  password:'sahar123',
  database:'outils_special'
});

conn.connect(function(error){
  if(error){
    throw (error);
  }
  console.log('connected :)');
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create_task', (req,res) => {
  res.render('create_task');
});

router.post('/create_task', (req,res) => {
  let task_title = req.body.task_title;
  let task_description = req.body.task_description;
  let task_creator = req.body.task_creator;
  var sql = "insert into tasks(nom_tache,description,creator)values(?,?,?)";
  values = [task_title, task_description, task_creator];
  conn.query(sql , values , function(err,result){
    if(err){
      throw(err);
    }
    let affectedRows = result.affectedRows;
    console.log(affectedRows, "rows inserted");
    res.render('task_created', {affectedRows});
  });
});

module.exports = router;
