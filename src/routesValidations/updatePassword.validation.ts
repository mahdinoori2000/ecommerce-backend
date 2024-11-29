import { body } from "express-validator";

export const updatePasswordValidation = [
    body("oldPassword")
        .notEmpty()
        .withMessage("Please provide your old password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    body("newPassword")
        .notEmpty()
        .withMessage("Please provide a new password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
    ];