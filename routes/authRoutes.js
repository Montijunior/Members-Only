const authController = require("../controllers/AuthControllers");
const { Router } = require("express");
const authRouter = Router();

// GET signup form
authRouter.get("/signup", authController.get_sign_up_form);
// POST signup form
authRouter.post("/signup", authController.post_sign_up_form);

module.exports = authRouter;
