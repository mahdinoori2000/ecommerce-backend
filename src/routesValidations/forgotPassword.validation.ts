import { body } from 'express-validator';

export const forgotPasswordValidation = [
    body("email")
        .isEmail()
        .withMessage("Email is invalid")
    ];