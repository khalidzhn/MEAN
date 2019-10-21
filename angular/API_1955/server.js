const express = require("express");
const app = express();
const mongoose = require('mongoose');


app.use(express.json());
app.listen(8000, () => console.log("listening on port 8000"));
var bodyParser = require('body-parser');
app.use(express.static( __dirname + '/ny-angular/dist/ny-angular' ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/1955_api', { useNewUrlParser: true });

/* var User = mongoose.model('User');
 */mongoose.Promise = global.Promise;



 require('./server/config/routes.js')(app);
