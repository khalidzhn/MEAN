const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qouts_DB', { useNewUrlParser: true });
const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 2 }
}, { timestamps: true })
// create an object to that contains methods for mongoose to interface with MongoDB
const Quote = mongoose.model('Quote', QuoteSchema);


app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));


 app.get("/", (req, res) => {
    res.render('index');
}); 
/* app.get('/', (req, res) => {
    Quote.findOne()
        .then(data => res.render("index", { quotes: data }))
        .catch(err => res.json(err));
}); */
app.get('/quotes', (req, res) => {
    arr = Quote.find({}, function(err, quotes) {
        res.render('quotes', {arr:quotes});
      })
});
/* 
app.post('/users', (req, res) => {
    console.log(req.body)
     
    res.render('users', {data: req.body});
}); */
app.post('/quotes', (req, res) => {
    console.log("POST Qoute", req.body);
    const quotes = new Quote();
    quotes.name = req.body.name;
    quotes.message = req.body.message;
    quotes.save(function(err) {
        if(err) {
          console.log('something went wrong');
          console.log(quotes.errors);
          res.render('index', {errors: quotes.errors})
        } 
        else { 
          console.log('successfully added a quote!');
          res.redirect('/quotes');
        }
      })
})