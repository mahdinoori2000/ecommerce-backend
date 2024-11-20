import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  database_url: process.env.DB_URI ? process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD || '') : '',
  jwtSecret: process.env.JWT_SECRET || '',
  nodeEnv: process.env.NODE_ENV,
};