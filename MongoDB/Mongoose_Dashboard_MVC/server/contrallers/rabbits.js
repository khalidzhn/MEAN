
const rabbit = require('../models/rabbit.js')

module.exports = {


  index: function (req, res) {
    // code...
    arr = rabbit.find({}, function (err, rabbit) {
      res.render('index', { arr: rabbit });
    });
  },
  
  create: function (req, res) {
    console.log("POST rabbit", req.body);
    const rabbits = new rabbit();
    rabbits.name = req.body.name;
    rabbits.favorite_food = req.body.favorite_food;
    rabbits.save(function (err) {
      if (err) {
        console.log('something went wrong');
        console.log(rabbits.errors);
        res.redirect('/')
      }
      else {
        console.log('successfully added a rabbit!');
        res.redirect('/');
      }
    });
  },

  new: function (req, res) {
    res.render('new');
  },

  one: function (req, res) {
    ra = rabbit.findOne({ _id: req.params.id }, function (err, rabit) {
      console.log(rabit);
      res.render('one', { ra: rabit });
    })
  },


  edit: function (req, res) {
    ra = rabbit.findOne({ _id: req.params.id }, function (err, rabbit) {
      console.log(rabbit);
      res.render('edit', { ra: rabbit });
    });
  },



  change: function (req, res) {
    console.log("POST DATA", req.body);
    rabbit.update({ _id: req.params.id },
      {
        name: req.body.name,
        favorite_food: req.body.favorite_food
      },
      function (err) {
        if (err) {
          console.log('something went wrong');
          console.log(rabbit.errors);
          res.redirect(`/meerkats/edit/${req.params.id}`)
        }
        else {
          console.log('successfully changed a Rabbit!');
          res.redirect(`/rabbit/${req.params.id}`);
        }
      });
  },


  delete: function (req, res) {
    rabbit.remove({ _id: req.params.id }, function (err) {
      console.log("Rabbit DELETED");
      res.redirect('/');
    });
  },


}