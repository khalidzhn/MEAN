let mongoose = require('mongoose');
let User = require('../models/tasck');


module.exports = {

    index: function (req, res) {
    
        User.find({},function(err, users){
            if(err){
                console.log("can't retrieve data", err);
                res.json({message: "error", error: err});
            } else {
                console.log("data is loadded");
                res.json({message: "Success", data: users});
            }
        });   
    
    },

    addTask: function(req, res){
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
    },

    deleteTask: function(req, res){
    
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
    
    },

    getTask: function(req, res){
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
    },
}