const { Router } = require("express");
const AuthController = require("../controllers/AuthController");
const authRouter = Router();

// authRouter.post("/auth/login", AuthController.authenticate);
authRouter.get("/auth/logout", AuthController.logout);

module.exports = authRouter;
