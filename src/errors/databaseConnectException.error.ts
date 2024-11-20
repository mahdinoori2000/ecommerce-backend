import CustomError from "./custom.error";

class DatabaseConnectError extends CustomError {
    statusCode = 500;

    constructor() {
        super("Failed to connect to the database.");

        Object.setPrototypeOf(this, DatabaseConnectError.prototype);
    }

    serializeErrors() {
        return [{ message: "Failed to connect to the database." }];
    }

}

export default DatabaseConnectError;