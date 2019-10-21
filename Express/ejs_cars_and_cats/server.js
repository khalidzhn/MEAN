const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.get('/', (req, res) => {
    console.log("Value of name in session: ", req.session.name);
    res.render('index', {title: "my root route"});
});
app.post('/users', (req, res) => {
    req.session.name = req.body.name;
    console.log(req.body) 
    console.log(req.session.name) 
    res.redirect('/');
});

app.get("/cats", (req, res) => { 
    console.log(req.session.name)    
    res.render('cats');
});
app.get("/cars", (req, res) => { 
    res.render('cars');
});
/* app.post('/users', (req, res) => {
    console.log(req.body) 
    res.redirect('/')
}); */
app.get("/form", (req, res) => { 
    res.render('form');
});
app.get('/users/:id', (req, res) => {
    console.log(req.params.id);
    res.redirect('/')

});