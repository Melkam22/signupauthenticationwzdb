const LocalStrategy = require('passport-local').Strategy;
const mogoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = require('../models/schema');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            //match client
         schema.findOne({email: email})
         .then(guest=>{
             if(!guest){
                 return done(null, false, {message: 'The email is not registered.'})
             }
             //match password
         bcrypt.compare(password, guest.password, (err, isMatch)=>{
             if(err) throw err;
             if(isMatch){
                 return done(null, guest);
             } else {
                 return done(null, false, {message: 'Incorrect Password.'})
             }
         })
         })
         .catch(err => console.log(err));
        })
    )
    //copy paste from passport documentation
    passport.serializeUser(function(guest, done) {
        done(null, guest.id);
      });
      passport.deserializeUser(function(id, done) {
        schema.findById(id, function(err, guest) {
          done(err, guest);
        });
      });
}