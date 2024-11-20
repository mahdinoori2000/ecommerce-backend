import { ValidationError } from "express-validator";
import CustomError from "./custom.error";

class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(private errors: ValidationError[]) {
        super('Invalid request parameters');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: (error as any).param };
        });
    }
}

export default RequestValidationError;