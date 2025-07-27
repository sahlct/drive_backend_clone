import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();


const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;

// console.log("token secrets", accessSecret, refreshSecret);

const accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES || '15m') as SignOptions['expiresIn'];
const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES || '7d') as SignOptions['expiresIn'];

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, accessSecret, {
    expiresIn: accessExpiresIn,
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, accessSecret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, refreshSecret);
};
