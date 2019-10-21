const express = require("express");
const app = express();


app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/client/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(express.urlencoded({ extended: true }));

require('./server/config/routes.js')(app)
