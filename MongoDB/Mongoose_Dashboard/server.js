const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MD_DB', { useNewUrlParser: true });
const rabbitSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2 },
  favorite_food: {type: String, required: true, minlength: 2}
}, { timestamps: true })
// create an object to that contains methods for mongoose to interface with MongoDB
const rabbit = mongoose.model('rabbit', rabbitSchema);


app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));


 app.get("/", (req, res) => {
  arr = rabbit.find({}, function(err, rabbit) {
    res.render('index', {arr:rabbit});
  })
   
}); 

app.get('/rabbit/new', (req, res) => {
    res.render('new');
});
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

app.post('/add',(req, res) => {
  console.log("POST rabbit", req.body);
  const rabbits = new rabbit();
  rabbits.name = req.body.name;
  rabbits.favorite_food = req.body.favorite_food;
  rabbits.save(function(err) {
      if(err) {
        console.log('something went wrong');
        console.log(rabbits.errors);
        res.redirect('/')
      } 
      else { 
        console.log('successfully added a rabbit!');
        res.redirect('/');
      }
    })
});
app.get('/rabbit/:id', function(req, res) {
  ra = rabbit.findOne({_id: req.params.id}, function(err, rabit) {
      console.log(rabit);
      res.render('one', {ra:rabit});
  })
});
app.get('/rabbit/edit/:id', function(req, res) {
  ra = rabbit.findOne({_id: req.params.id}, function(err, rabbit) {
      console.log(rabbit);
      res.render('edit', {ra:rabbit});
  })
});


app.post('/change/:id', function(req, res) {
  console.log("POST DATA", req.body);
  rabbit.update({_id: req.params.id},
                  {name: req.body.name,
                  favorite_food: req.body.favorite_food},
                  function(err){
                      if(err) {
                          console.log('something went wrong');
                          console.log(rabbit.errors);
                          res.redirect(`/meerkats/edit/${req.params.id}`)
                      } 
                      else {
                          console.log('successfully changed a Rabbit!');
                          res.redirect(`/rabbit/${req.params.id}`);
                      }

  })
});
app.post('/delete/:id', function(req,res){
  rabbit.remove({_id: req.params.id}, function(err){
      console.log("Rabbit DELETED");
      res.redirect('/');
  })
})