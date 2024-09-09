const { Router } = require("express");
const authRouter = Router();
const AuthController = require("../controllers/AuthController");

// GET signup page
authRouter.get("/signup", AuthController.user_signup_get);

module.exports = authRouter;
