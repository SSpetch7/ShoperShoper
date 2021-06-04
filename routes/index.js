var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport');



router.get('/',function(req,res){
    res.render('collections/collection.ejs');
});

/* Register */ 
router.get('/register',function(req,res){
    res.render('register.ejs');
});
router.post('/register', function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/home');
        });
    });
});



router.get('/login',function(req,res){
    res.render('login.ejs');
});
router.post('/login',passport.authenticate('local',
    {
    successRedirect: '/home',
    failureRedirect: '/login'
    }), function(res,res){
});

router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/home');
});

module.exports = router;