import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index';

export const createJwt = (req: Request, res: Response, payload: any) => {
  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: config.nodeEnv === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as { exp: number };
    if (!decoded?.exp) return false; 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTimestamp;
  } catch (err) {
    return true;
  }
};
