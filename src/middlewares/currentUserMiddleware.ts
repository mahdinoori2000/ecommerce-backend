import { Request, Response, NextFunction } from "express";

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
            session?: { jwt?: string };
        }
    }
}

const currentUserMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = JSON.parse(req.session.jwt) as UserPayload;
        req.currentUser = payload;
    } catch (err) {}

    next();
};