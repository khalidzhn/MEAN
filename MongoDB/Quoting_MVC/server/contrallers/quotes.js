
const Quote = require('../models/quote.js')

module.exports = {


    index: function (req, res) {
        // code...
        arr = Quote.find({}, function (err, quotes) {
            res.render('quotes', { arr: quotes });
        });
    },
    create: function(req,res){

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
          });
    
    },


}