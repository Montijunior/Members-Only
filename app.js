require("dotenv").config;
const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const authController = require("./controllers/AuthController");
const AuthRoutes = require("./routes/authRoutes");
const UserRoutes = require("./routes/userRoutes");
const app = require("express");
const authRouter = require("./routes/authRoutes");

app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// add connect-pg-simple later
const secret = process.env.SECRET_KEY;
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.session());

// user available to all controllers and views
app.use((req, res, next) => {
  app.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", UserRoutes);

// function 1
passport.use(authController.strategy);
// function 2
passport.serializeUser(authController.serializeUser);
// function 3
passport.deserializeUser(authController.deserializeUser);

// Routes
app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Members Only app listening on localhost:${process.env.PORT}`);
});

module.exports = passport;
