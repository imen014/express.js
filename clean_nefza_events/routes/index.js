var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
  host:'localhost',
  user:'sahar',
  password:'sahar123',
  database:'clean_nefza_project'
});
conn.connect(function(err){
  if(err){
    throw(err);
  }
  console.log('connected :)');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/set_location', (req,res) => {
res.render('set_location');
});

router.post('/set_location', (req,res) => {
  let ville = req.body.ville;
  let governorat = req.body.governorat;
  let village = req.body.village;
  let location = [ville, governorat, village];
  let sql = "insert into location(ville,governorat,village)values(?,?,?)";
  conn.query(sql, location, function(err,result){
    if(err){
      throw(err);
    }
    let affectedRows = result.rowsAffected;
    console.log(affectedRows , "inserted");
    res.render('location_setted', {affectedRows});
  });
});

router.get('/our_locations', (req,res) => {
  res.render('get_locations_list');
});

router.post('/our_locations', (req,res) => {
  let sql = "select * from location";
  conn.query(sql, function(err,locations){
    if(err){
      throw(err);
    }
    console.log(locations);
    res.render('location_list', {locations});
  });
});

router.get('/search_locations_by_ville', (req,res)=>{
  res.render('search_locations_by_ville');
});

router.post('/search_locations_by_ville', (req,res) => {
  let ville = req.body.ville;
  //ville_prop = [ville];
  let sql = "select * from location where ville=?";
  conn.query(sql, ville , function(err, locations){
    if(err){
      throw(err);
    }
    console.log(locations);
    res.render('get_locations_by_ville', {locations});
  });

});

router.get('/search_location_by_governorat', (req,res) => {
  res.render('search_loc_gov');
});

router.post('/search_location_by_governorat', (req,res) => {
  let governorat = req.body.governorat;
 
  let sql = "select * from location where governorat=?";
  conn.query(sql, governorat , function(err, locations){
    if(err){
      throw(err);
    }
    console.log(locations);
    res.render('get_locations_by_gevernorat', {locations});
  });

});

router.get('/search_location_by_village', (req,res) => {
  res.render('search_loc_village');
});

router.post('/search_location_by_village', (req,res) => {
  let village = req.body.village;
 
  let sql = "select * from location where village=?";
  conn.query(sql, village , function(err, locations){
    if(err){
      throw(err);
    }
    console.log(locations);
    res.render('get_locations_by_village', {locations});
  });

});

router.get('/delete_location', (req,res) => {
  res.render('delete_location');
});

router.post('/delete_location', (req,res) => {
  let governorat = req.body.governorat;
  let sql = "delete from location where governorat=?";
  conn.query(sql, governorat, function(err,result){
    if(err){
      throw(err);
    }
    affectedRows = result.affectedRows;
    console.log(affectedRows , " deleted succefully !");
    res.render('location_deleted', {affectedRows});
  });
});

router.get('/update_location', (req,res) => {
  res.render('update_location');
});

router.post('/update_location', (req,res) => {
  let village = req.body.village;
  let ville = req.body.ville;
  let sql = "update location set village=? where ville=?";
  location_toUpdate = [village, ville];
  conn.query(sql, location_toUpdate, function(err,result){
    if(err){
      throw(error);
    }
    let rowsAffected = result.affectedRows;
    console.log(rowsAffected, " updated");
    res.render('village_updated', rowsAffected);
  });

});

router.get('/create_user', (req,res) => {
  res.render('create_user');
});

router.post('/create_user', (req,res) => {
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let role = req.body.role;
  let user = [username,email,phone,role];
  let sql = "insert into users(username,email,phone,role)values(?,?,?,?)";
  conn.query(sql, user, function(err, result){
    if(err){
      throw(err);
    }
    let rowsAffected = result.affectedRows;
    console.log(rowsAffected, " created succeffully");
    res.render('user_created', {rowsAffected});
  });

});

router.get('/list_users', (req,res) => {
  res.render('get_list_users');
});

router.post('/list_users', (req,res) => {
  let sql = "select * from users";
  conn.query(sql, function(err,result){
    if(err){
      throw(err);
    }
    console.log(result);
    res.render('list_users', {result});
  });
});

router.get('/search_user_by_phone_number', (req,res) => {
  res.render('search_user_by_phone_number');
});

router.post('/search_user_by_phone_number', (req,res) => {
  let phone = req.body.phone;
  let sql = "select * from users where phone=?";
  conn.query(sql, phone, function(err,result){
    if(err){
      throw(err);
    }
    console.log(result);
    res.render('get_users_list_by_phone_number', {result});
  });
});

router.get('/search_user_by_email', (req,res) => {
  res.render('search_user_by_email');
});

router.post('/search_user_by_email', (req,res) => {
  let email = req.body.email;
  let sql = "select * from users where email=?";
  conn.query(sql, email, function(err,result){
    if(err){
      throw(err);
    }
    console.log(result);
    res.render('get_users_list_by_email', {result});
  });
});

router.get('/delete_user', (req,res) => {
  res.render('delete_user');
});

router.post('/delete_user', (req,res) => {
  let username = req.body.username;
  let sql = "delete from users where username=?";
  conn.query(sql, username, function(err,result){
    if(err){
      throw(err);
    }
    let rowsAffected = result.affectedRows;
    console.log(rowsAffected, " deleted");
    res.render('user_deleted', {rowsAffected});
  });
});

router.get('/update_username', (req,res) => {
  res.render('update_username');
});

router.post('/update_username', (req,res) => {
  let username = req.body.username;
  let phone = req.body.phone;
  let sql = "update users set username=? where phone=?";
  let values = [username, phone];
  conn.query(sql, values, function(err,result){
    if(err){
      throw(err);
    }
    const rowsAffected = result.affectedRows;
    console.log(rowsAffected, " updated");
    res.render('username_updated', {rowsAffected});
  });
});

router.get('/update_email', (req,res) => {
  res.render('update_email');
});

router.post('/update_email', (req,res) => {
  let username = req.body.username;
  let email = req.body.email;
  let sql = "update users set email=? where username=?";
  let values = [email, username];
  conn.query(sql, values, function(err,result){
    if(err){
      throw(err);
    }
    const rowsAffected = result.affectedRows;
    console.log(rowsAffected, " email updated");
    res.render('email_updated', {rowsAffected});
  });
});

router.get('/search_user', (req,res) => {
  res.render('search_user_by_role');
});

router.post('/search_user', (req,res) => {
  let role = req.body.role;
  let sql = "select * from users where  role=?";

  conn.query(sql, role , function(err,result){
    if(err){
      throw(err);
    }
    console.log(result);
    res.render('users_list_by_role', {result});
  });
});






module.exports = router;
