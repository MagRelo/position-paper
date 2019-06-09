const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').UserModel;

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);
