import { body, param } from 'express-validator';

export const resetPasswordValidation = [
    param('token')
        .isString()
        .withMessage('Token must be a string'),
    body('newPassword')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .isLength({ max: 50 })
        .withMessage('Password must be at most 50 characters long'),
];