var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/welcome', (req,res) => {
  res.render('welcome');
});

router.get('/page1', (req,res) => {
  res.render('page1');
});

router.get('/page2', (req,res) => {
  res.render('page2');
});
router.get('/third/:username', (req,res) => {
  let username = req.params.username
  //let username="sahar"
  res.render('third', {username});
});

module.exports = router;
