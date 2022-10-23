const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);


});

passport.use(new GoogleStrategy({
  clientID: "796180447728-ugermukqu9r8iu2c0mqbl6j81gpus6pp.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http:/localhost:3000/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    return done(null, user);

  }
));