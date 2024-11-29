import { Response } from 'express';

/**
 * Sends a standardized success response.
 * 
 * @param res - Express response object
 * @param data - The data to include in the response
 * @param statusCode - HTTP status code (default: 200)
 */
const clientResponse = <T>(res: Response, data: T, message?: string, statusCode: number = 200): void => {
    const response: any = {
        status: 'success',
        data,
    };

    if (message) {
        response.message = message;
    }

    res.status(statusCode).json(response);
};

export default clientResponse;