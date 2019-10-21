const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb://localhost/qouts_DB', { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 2 }
}, { timestamps: true })
// create an object to that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model('Quote', QuoteSchema);


require('./ server/ config/ routes.js')(app)