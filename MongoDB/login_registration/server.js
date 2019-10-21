const express = require("express");
const app = express();
const session = require('express-session');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MD_DB', { useNewUrlParser: true });
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name required to register"]
    },
    last_name: {
        type: String,
        required: [true, "Last Name required to register"]
    },
    email: {
        type: String,
        required: [true, "Must have a valid email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: [true, 'A password is required'],
        minlength: 8,
    }
});

const User = mongoose.model('User', UserSchema);
const bcrypt = require('bcrypt');

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

const flash = require('express-flash');
app.use(flash());

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render('login');
});
app.get("/dashboard", function (req, res) {
    console.log("~Dashboard~");
    res.render("dashboard");
})

app.get("/registration", (req, res) => {
    res.render('registration');
});

app.post('/login',function(request,response){
    User({email: request.body.email, password: request.body.password}).validate()
        .then((user)=>{
            bcrypt.hash(request.body.password,10)
        .then((hashed_pass)=>{
            User.find({email:request.body.email,password: hashed_pass})
                .then((user)=>{
                    request.session = {first_name:user.first_name,last_name:user.last_name,email:user.email,birthday:user.birthday};
                    response.redirect('/')
                })
                .catch((error)=>{
                    for(var key in error.errors){
                        request.flash('login', error.errors[key].message);
                    }
                    response.redirect('/')
                })
        })
        .catch((error)=>{
            for(var key in error.errors){
                request.flash('login', error.errors[key].message);
            }
            response.redirect('/')
        });
    });
});

app.post("/register", function(req, res){
    console.log("~Register~", req.body);
    User.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email,password: req.body.password}, function(err, user){
        if(err){
            console.log("~Something went wrong!~", err);
            for(var key in err.errors){
                req.flash("regform", err.errors[key].message);
            }
            res.redirect("/");
        }
        else{
            console.log("~Successfully registered!~");
            res.redirect("/dashboard");
        }
    })
});
