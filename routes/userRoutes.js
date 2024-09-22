const userController = require("../controllers/UserControllers");
const { Router } = require("express");
const userRouter = Router();

// GET index page
userRouter.get("/", userController.home_page_get);

module.exports = userRouter;
