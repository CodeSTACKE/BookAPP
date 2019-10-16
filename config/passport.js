var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
  new LocalStrategy({
    usernameField: "email",
     
  },
  function (email, password, done) {
    var userObj={};
    userObj.email=email;
    db.User.findOne({
      where:userObj        
    }).then(function (dbUser) {
      if (!dbUser) {
        return done(null, false, {
          message: "incorrect user"
        });
      } else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "incorrect Password"
        });
      }
      return done(null, dbUser);
    });
  }
  )
);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
module.exports = passport;