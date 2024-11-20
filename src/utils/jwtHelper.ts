import jwt from 'jsonwebtoken';
import { config } from '../config/index';

const createJwt = (payload: any) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '90d' });
};

const verifyJwt = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as { exp: number };
    if (!decoded?.exp) return false; 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTimestamp;
  } catch (err) {
    return true;
  }
};

const refreshJwt = (oldToken: string) => {
  const decoded = jwt.decode(oldToken);
  if (!decoded) throw new Error('Invalid token');
  const { exp, ...payload } = decoded as any;
  return createJwt(payload);
};

const getJwtPayload = (token: string) => {
  const decoded = jwt.decode(token);
  if (!decoded) throw new Error('Invalid token');
  return decoded;
};

export {
  createJwt,
  verifyJwt,
  isTokenExpired,
  refreshJwt,
  getJwtPayload,
};
