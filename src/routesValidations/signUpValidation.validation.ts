import { body } from "express-validator";

export const signUpValidation = [
    body("firstName")
      .notEmpty()
      .withMessage("Please provide a First Name")
      .isLength({ max: 50 })
      .withMessage("First Name must be less than 50 characters"),
    body("lastName")
      .notEmpty()
      .withMessage("Please provide a Last Name")
      .isLength({ max: 50 })
      .withMessage("Last Name must be less than 50 characters"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("role")
      .optional()
      .isIn(["admin", "user"])
      .withMessage("Role must be valid"),
    body("password")
      .notEmpty()
      .withMessage("Please provide a Password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .isLength({ max: 50 })
      .withMessage("Password must be less than 50 characters"),
    body("passwordConfirm")
      .notEmpty()
      .withMessage("Please confirm your Password")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      })
      .isLength({ max: 50 })
      .withMessage("Password must be less than 50 characters"),
    body("notifyMe")
      .optional()
      .isBoolean()
      .withMessage("Notify me must be a boolean"),
    body("profileImage").optional().isString(),
    body("dateOfBirth")
      .isDate()
      .withMessage("Date of Birth must be a valid date"),
  ];
  