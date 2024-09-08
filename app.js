require("dotenv").config;
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const authController = require("./controllers/AuthController");
const app = require("express");

app.set("views", path.join("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// add connect-pg-simple later
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.session());

// function 1
passport.use(authController.strategy);
// function 2
passport.serializeUser(authController.serializeUser);
// function 3
passport.deserializeUser(authController.deserializeUser);
// user available to all controllers and views
// app.use((req, res, next) => {
//   app.locals.currentUser = req.user;
//   next();
// });

// Routes

app.listen(process.env.PORT || 3000, () => {
  console.log(`Members Only app listening on localhost:${process.env.PORT}`);
});
