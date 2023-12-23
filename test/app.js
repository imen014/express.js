const express = require('express');
const app = express();
const multer = require('multer');
const bodyParser = require('body-parser');

const storage = multer.memoryStorage();
const upload = multer({ storage:storage });
const cookieParser = require('cookie-parser');


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());

/*let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/addTask', (req,res) => {
    const newTask = req.body.newTask;
    tasks.push(newTask);
    res.redirect('/');
});


app.get('/greet/:name', (req,res) => {
    const name = req.params.name;
    res.render('greet', { name });

})
*/

app.get('/contact', (req,res) => {
    res.render('contact');
});

app.post('/contact', upload.single('avatar') , (req, res) => {
    console.log('Nom:', req.body.name);
    console.log('email:', req.body.email);
    console.log('message:', req.body.message);
    console.log('your best freind is : ', req.body.best_freind_name);
    console.log('la voiture de votre voisin', req.body.voiture_voisin);
    if(req.file){
        console.log('fichier telechargé:', req.file.originalname);
        res.render('confirmation');
    }
});

app.get('/welcome_page/:lastname', (req,res) => {
    const lastname = req.params.lastname;
    const phone = "93090615";
    res.render('page1', {lastname, phone});
    //res.send("page de bienvenue");
});

app.get('/form', (req,res) => {
    res.render('form');
});

app.post('/form', (req,res) => {
    const {firstname, lastname} = req.body;
    res.render('result', {firstname, lastname});
});


app.get('/inscription', (req,res) => {
    res.render('inscription');
});

app.post('/confirm_inscription', (req,res) => {
    /*username = req.params.username;
    email = req.params.email;
    password = req.params.password;*/
    const {username, email, password} = req.query;
    res.render('confirm_inscription', {username,email,password});
});

app.get('/confirm_inscription', (req,res) => {
    res.render('confirm_inscription', {username:req.query.username, email:req.query.email, password:req.query.password});
});

app.get('/', (req,res) => {
    res.render('page1');
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.post('/page_form1', (req,res) => {
    res.render('page_form1');

});

app.get('/set-cookie/:value1/:value2', (req,res) => {
    const cookieValue1 = req.params.value1;
    const cookieValue2 = req.params.value2;
    res.cookie('moncookie', `${cookieValue1} , ${cookieValue2}` , {maxAge:900000, httpOnly:true });
    res.send('cookie defini avec succées !');
});

app.get('/get_cookie', (req,res) => {
    const cookieValue = req.cookies.moncookie;
    if(cookieValue){
        const [cookieValue1, cookieValue2] = cookieValue.split(',');
        res.send(`la valeur de cookie est : ${cookieValue1} , ${cookieValue2}`);
    }else{
        res.send('le cookie est introuvable');
    }

});

const port = 3000;
app.listen(port, () => {
    console.log(`le serveur est en ecoute sur ${port}`);
})