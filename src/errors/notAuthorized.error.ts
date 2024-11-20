import CustomError from "./custom.error";

class NotAuhorizedError extends CustomError {
    statusCode = 401;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, NotAuhorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export default NotAuhorizedError;