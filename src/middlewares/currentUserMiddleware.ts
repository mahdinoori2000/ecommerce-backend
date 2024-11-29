import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index"

export interface UserPayload {
    id: string;
    email: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const currentUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token;

    if (!token) {
        return next();
    }

    try {
        const payload = jwt.verify(token, config.jwtSecret) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.error("Invalid token:", err);
    } 

    next();
};

export default currentUserMiddleware;