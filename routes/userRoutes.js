const { Router } = require("express");
const UserController = require("../controllers/UserController");
const userRouter = Router();

// GET home page
userRouter.get("/", UserController.users_homepage_get);

module.exports = userRouter;
