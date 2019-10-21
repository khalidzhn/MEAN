const quotes = require('../contrallers/quotes.js')


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
  quotes.index(req, res);

});
/* 
app.post('/users', (req, res) => {
    console.log(req.body)
     
    res.render('users', {data: req.body});
}); */
app.post('/quotes', (req, res) => {
   quotes.create(req,res);
});

}