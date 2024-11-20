import { Request, Response, NextFunction } from "express";
import NotAuhorizedError from "../errors/notAuthorized.error";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuhorizedError("Please login to get Access");
  }

  next();
};

export default requireAuth;