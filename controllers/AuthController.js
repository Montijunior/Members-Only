const AuthModel = require("../models/AuthModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
// GET sign up page
exports.user_signup_get = (req, res) => {
  res.render("sign-up-form.ejs", { title: "Join ClubHouse" });
};

// POST sign up page
exports.user_signup_post = async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashPassword) => {
    if (err) {
      console.error(err.message);
      res.redirect("/auth/signup");
    }
    await AuthModel.insertUser(first_name, last_name, username, hashPassword);
    res.redirect("/");
  });
};
