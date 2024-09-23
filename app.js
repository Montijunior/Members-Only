require("dotenv").config();
const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const path = require("path");
const pool = require("./models/pool");
const passport = require("./config/passport");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.set("views", path.join("views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "session",
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);
// app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", userRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT, () =>
  console.log(
    `Members Only Application listening on localhost:${process.env.PORT}`
  )
);
