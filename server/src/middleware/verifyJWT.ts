import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
}

const verifyJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token: string | undefined = req.cookies?.token;

  if (!token) {
    res
      .status(403)
      .json({ auth: false, message: 'Token required for authentication' });
    return;
  }

  jwt.verify(token, process.env.NODE_ENV_JWT as Secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ auth: false, message: 'Failed to authenticate' });
      return;
    }

    if (decoded && typeof decoded === 'object' && 'id' in decoded) {
      req.userId = (decoded as JwtPayload).id; // Attach userId to request object
    }

    // Continue to the next middleware or route handler
    next();
  });
};

export default verifyJWT;
