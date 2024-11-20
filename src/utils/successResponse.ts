import { Response } from 'express';

/**
 * Sends a standardized success response.
 * 
 * @param res - Express response object
 * @param data - The data to include in the response
 * @param statusCode - HTTP status code (default: 200)
 */
const clientResponse = <T>(res: Response, data: T, statusCode: number = 200): void => {
    res.status(statusCode).json({
        status: 'success',
        data,
    });
};

export default clientResponse;
