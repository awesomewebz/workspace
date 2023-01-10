const passport = require("passport");
const {Strategy} = require('passport-local');
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const LocalStrategy = Strategy;


passport.use(new LocalStrategy({
    usernameField: 'mobile',
    passReqToCallback: true
 },
  function(req, mobile, password, done){
     Users.findOne({mobile: mobile}, async (err, user)=>{
       // handle errors and checks
       if(err){console.log("Error FInding In User"); return done(err);}
       let match = await bcrypt.compare(password, user.password);
       if(!user || !match){
         console.log("Invalid Password"); 
         return done(null, false);
     }
       return done(null, user);
 
     });
  }
 ));

 // serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the keys in the cookies 
passport.deserializeUser(function(id, done){
    Users.findById(id, function(err, user){
      if(err){console.log("Error FInding In User"); return done(err);}
      return done(null, user);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass to next
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/');
    
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the cookei
        res.locals.user = req.user;
    }
    next();
}

module.exports =  passport;