const passport = require("passport");
const AuthModel = require("./models/AuthModel");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

// function one : Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await AuthModel.getUserName(username);
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect email address" });
      }
      const match = bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// function two: serialize user
passport.serializeUser((user, done) => {
  done(null, user.member_id);
});

// function three: deserialize user
passport.deserializeUser(async (member_id, done) => {
  try {
    const rows = await AuthModel.getUserId(member_id);
    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
