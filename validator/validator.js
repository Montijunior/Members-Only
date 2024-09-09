const { body } = require("express-validator");
const AuthModel = require("../models/AuthModel");

const sign_up_validator = [
  body("first_name")
    .trim()
    .isEmpty()
    .withMessage("first name cannot be empty")
    .isLength({ min: 4, max: 50 })
    .withMessage("first name must between 4 and 50 characters")
    .isAlpha()
    .withMessage("first name must contain only alphabetical letters")
    .escape(),
  body("last_name")
    .trim()
    .isEmpty()
    .withMessage("last name cannot be empty")
    .isLength({ min: 4, max: 50 })
    .withMessage("last name must between 4 and 50 characters")
    .isAlpha()
    .withMessage("last name must contain only alphabetical letters"),
  body("username")
    .custom(async (value) => {
      const rows = await AuthModel.getUserName(value);
      const user = rows[0].username;
      if (user) {
        throw new Error("E-mail already in use");
      }
    })
    .isEmpty()
    .withMessage("email cannot be empty")
    .trim()
    .isEmail()
    .withMessage("enter a valid email address"),
  body("password")
    .isEmpty()
    .withMessage("password field cannot be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must have minimum length of 8"),
  body("confirmPassword").custom(async (value) => {
    if (value === req.body.password) {
      throw new Error("password do not match");
    }
  }),
];

module.exports = {
  sign_up_validator,
};
