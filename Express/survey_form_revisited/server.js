const express = require("express");
const path = require("path");
const session = require("express-session")
const bodyParser = require("body-parser");
const app = express();
const server = app.listen(1337);


app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "secretkey",
resave: true,
saveUninitialized: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on("posting_form", function (data){
        const random_number = Math.floor((Math.random() * 1000) + 1);
    socket.emit('updated_message', {response: data}); 
    socket.emit('random_number', {response: random_number}); 
   });
});

app.get('/', function(req, res) {
    res.render("index");
});