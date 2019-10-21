const express = require("express");
const app = express();


app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
/* app.use(function(req, res, next) {
    res.locals.view = req.session.view;
    next();
  }); */

const session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/', (req, res) => {

    if (req.session.view) {
        req.session.view+=1
        res.send("You visited this page " + req.session.view + " times");
        console.log("Value of name in session: ", req.session.view);


    } else {
        req.session.view = 1;
        res.send("Welcome to this page for the first time!");
        console.log("Value of name in session: ", req.session.view);

    }
});



