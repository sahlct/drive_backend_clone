import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt'; // ✅ use correct one

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyAccessToken(token); // ✅ NOT verifyRefreshToken
    req.user = { id: (decoded as any).userId };
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
