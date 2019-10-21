var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/QD_DB');

// Use native promises
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 }, 
    message: { type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
    }, { timestamps: true });
mongoose.model('Post', PostSchema); 
var Post = mongoose.model('Post');   

// What would we need to add to make the below snippet work properly? Read your console!
var CommentSchema = new mongoose.Schema({
    _post: {type: Schema.Types.ObjectId, ref: 'Post'},
    name: {type: String, required: true, minlength: 2 },
    message: { type: String, required: true },
    }, {timestamps: true });

mongoose.model('Comment', CommentSchema); 
var Comment = mongoose.model('Comment'); 
   

app.get('/', function(req, res) {
    arr = Post.find({}).populate('comments')
    .exec(function(err, posts){
        console.log('~~~~~~~~~~~~~~~~~~~~~');
        res.render('index', {p:posts})
    })
    
})
// app.get('/', function(req, res) {
//     arr = Post.find({}, function(err, posts) {
//         console.log(posts);
//         res.render('index', {p:posts});
//     })
    
// })


app.post('/post', function(req, res) {
  console.log("POST DATA", req.body);
  var post = new Post({name: req.body.name, message: req.body.message});
  post.save(function(err) {
    if(err) {
      console.log('something went wrong');
      console.log(post.errors);
      res.redirect('/')
    } 
    else {
      console.log('successfully added a Post!');
      res.redirect('/');
    }
  })
})
 

app.post('/comment/:id', function (req, res){
    Post.findOne({_id: req.params.id}, function(err, post){
        console.log(req.body.comment_name);
        console.log(req.body.comment_message);
        var comment = new Comment(
            {name: req.body.comment_name,
            message: req.body.comment_message,
            _post: post._id
            });
        console.log(comment);
        comment.save(function(err){
            post.comments.push(comment);
            post.save(function(err){
                if(err) {
                    console.log('something went wrong');
                    console.log(comment.errors);
                    res.redirect('/')
                  } 
                  else {
                    console.log('successfully added a Comment!');
                    res.redirect('/');
                  }
            });
        });
    });
});

// app.post('/comment/:id', function(req, res) {
//   console.log("POST DATA", req.body);
//   var comment = new Comment({name: req.body.name, message: req.body.message, _post: req.});
//   comment.save(function(err) {
//     if(err) {
//       console.log('something went wrong');
//       console.log(comment.errors);
//       res.redirect('/')
//     } 
//     else {
//       console.log('successfully added a Meerkat!');
//       res.redirect('/');
//     }
//   })
// })

  // Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});