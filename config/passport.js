const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../models/pool");
const DB = require("../models/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        "SELECT id, username, password FROM members WHERE username = $1;",
        [username]
      );
      const user = result.rows[0];
      if (!user) {
        return done(null, false, { message: "Incorrect e-mail address" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const result = await pool.query("SELECT * FROM members WHERE id = $1;", [id]);
  const user = result.rows[0];
  done(null, user);
});

module.exports = passport;
