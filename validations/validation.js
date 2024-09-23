const { body } = require("express-validator");
const DB = require("../models/queries");
const pool = require("../models/pool");

const signUpValidation = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("first name cannot be empty")
    .isAlpha()
    .withMessage("first name contain only letters")
    .isLength({ min: 3, max: 50 })
    .withMessage("first name should be between 3 and 50 characters"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("last name cannot be empty")
    .isAlpha()
    .withMessage("last name contain only letters")
    .isLength({ min: 3, max: 50 })
    .withMessage("last name should be between 3 and 50 characters"),
  body("username")
    .notEmpty()
    .withMessage("email address cannot be empty")
    .isEmail()
    .withMessage("enter a valid email address")
    .custom(async (value) => {
      const query = {
        text: "SELECT * FROM members WHERE username = $1;",
        values: [value],
      };
      const user = await pool.query(query);
      console.log(user.rows);
      if (user.rows.length > 0) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must have a minimum length of 8 characters")
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    })
    .withMessage("password do not match"),
];

const messageFormValidations = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("title name cannot be empty")
    .isAlpha()
    .withMessage("title must contain only letters")
    .isLength({ min: 5, max: 50 })
    .withMessage("title should be between 5 and 50 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("textarea cannot be empty")
    .isAlphanumeric()
    .withMessage("textarea must  contain only letters and numbers")
    .isLength({ max: 200 })
    .withMessage("textarea should be maximum of 200 characters"),
];

module.exports = { signUpValidation, messageFormValidations };
