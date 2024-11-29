import { body } from "express-validator";

export const signInValidation = [
    body("email").isEmail().withMessage("Email is invalid"),
    body("password")
      .notEmpty()
      .withMessage("Please provide a Password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
