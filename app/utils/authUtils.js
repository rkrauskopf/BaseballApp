var User = require('../models/user.js');

var MongoClient = require('mongodb').MongoClient;

var mongodb = require('mongodb');


// route middleware to make sure a user is logged in
var isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

var isAdmin = function(req, res, next) {

    User.findOne({_id: req.session.passport.user}, function(err, user){
       if(user._doc.local.userType === 'Admin') {
           return next();
       }
       else {
           res.send('500', 'Internal Server Error')
       }
    });
}

var isTrainer = function(req, res, next) {
    User.findOne({_id: req.session.passport.user}, function(err, user){
        if(user._doc.local.userType === 'Trainer') {
            return next();
        }
        else {
            res.send('500', 'Internal Server Error')
        }
    });
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdmin = isAdmin;
module.exports.isTrainer = isTrainer;