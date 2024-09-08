const LocalStrategy = require("passport-local");
const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcryptjs");

const strategy = new LocalStrategy(async (username, password, done) => {
  try {
    const rows = await AuthModel.getUserName(username);
    const user = rows[0];
    if (!user) {
      return done(null, false, { message: "Incorrect email address" });
    }
    //   bcrypt to match passwords
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

// serialize user
const serializeUser = (user, done) => {
  done(null, user.member_id);
};

const deserializeUser = async (member_id, done) => {
  try {
    const rows = await AuthModel.getUserId(member_id);
    const user = rows[0];
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

module.exports = {
  strategy,
  serializeUser,
  deserializeUser,
};
