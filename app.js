require("dotenv").config();
const exp = require("constants");
const express = require("express");
const session = require("express-session");
const passport = require("./passport");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const secret = process.env.SECRET_KEY;

app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  })
);

// passport
app.use(passport.session());
// all controllers and viewers router: user
app.use((req, res, next) => {
  app.locals.currentUser = req.user;
  next();
});

// App routes
app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.set(passport);

// Login route
app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  })
);

// Logout route
app.get("/auth/logout", (req, res) => {
  req.user((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Members Only Application running on localhost:${port}`);
});

module.exports = { app };
