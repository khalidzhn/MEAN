const express = require("express");
const app = express();


app.listen(8000, () => console.log("listening on port 8000"));
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(express.static( __dirname + '/ny-angular/dist/ny-angular' ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/1955_api', { useNewUrlParser: true });

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true}
}, {timestamps: true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
mongoose.Promise = global.Promise;


app.get('/',(req,res)=>{

    User.find({},function(err, users){
        if(err){
            console.log("can't retrieve data", err);
            res.json({message: "error", error: err});
        } else {
            console.log("data is loadded");
            res.json({message: "Success", data: users});
        }
    });   
});

app.get('/new/:name',(req,res)=>{
    var user= new User({name:req.params.name});
    user.save(function(err){
        if(err){
            console.log("ERROR");
            res.json({message:"error",erorr:err});
        }
        else{
            console.log('user is add successfuly!');
            res.redirect('/');
        }
    })
});


app.get('/remove/:name',(req,res)=>{
    User.findOneAndRemove({name:req.params.name},function(err){
        if(err){
            console.log("ERROR");
            res.json({message:"error",erorr:err});
        }
        else{
            console.log('user is removed successfuly!');
            res.redirect('/');
        }
    })
});

app.get('/:name',(req,res)=>{
    User.findOne({name:req.params.name},function(err,user){
        if(err){
            console.log("ERROR");
            res.json({message:"error",erorr:err});
        }
        else{
            if(user == null)
            res.json({message: "User Not Found!", data: user});

            console.log('One user!');
            res.json({message: "Success", data: user});
        }
    })
});



