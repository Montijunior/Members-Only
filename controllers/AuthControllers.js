const { validationResult } = require("express-validator");
const { signUpValidation } = require("../validations/validation");
const bcrypt = require("bcryptjs");
const DB = require("../models/queries");
const passport = require("passport");

// GET sign_up page
exports.get_sign_up_form = (req, res) => {
  res.render("sign-up-form", { title: "Join ClubHouse", errors: [] });
};

// POST sign up page
exports.post_sign_up_form = [
  signUpValidation,
  async (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const results = validationResult(req);
    if (!results.isEmpty()) {
      return res.render("sign-up-form", {
        title: "Join ClubHouse",
        errors: results.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await DB.insertUser(first_name, last_name, username, hashedPassword);
      return res.redirect("/");
    } catch (error) {
      return res.render("sign-up-form", {
        title: "Join ClubHouse",
        errors: [{ msg: "an error ocurred please try again later" }],
      });
    }
  },
];

// GET sign-in-form
exports.get_sign_in_form = (req, res) => {
  res.render("sign-in-form", { title: "Login", errors: [] });
};

// POST sign-in-form
exports.post_sign_in_form = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
});

// GET log-out
exports.get_logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  res.redirect("/");
};
