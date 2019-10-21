const mongoose = require('mongoose');
const Quote = mongoose.model('Quote');

module.exports = function (app){
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
}