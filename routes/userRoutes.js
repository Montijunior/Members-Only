const userController = require("../controllers/UserControllers");
const { Router } = require("express");
const userRouter = Router();

// GET index page
userRouter.get("/", userController.home_page_get);

// GET new message form (if user is authenticated)
userRouter.get("/message/:id/new", userController.get_new_message_form);

// POST new message
userRouter.post("/message/:id/new", userController.post_new_message_form);

module.exports = userRouter;
