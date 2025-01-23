import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


//authenticateJWT
/**
 * Middleware to authenticate a user by verifying the JWT token.
 * The token should be sent in the 'Authorization' header as 'Bearer <token>'.
 * If the token is valid, the user payload is attached to the request object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */

//authorizeAdmin
/**
 * Middleware to authorize access for admin users only.
 * If the user role is not 'admin', a 403 status code is returned.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void}
 */



interface UserPayload {
  userId: string;
  role: string;
  // Include other fields from your JWT payload
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }

    req.user = user as UserPayload;
    next(); // Ensure next() is called
  });
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
     res.status(403).json({ message: 'Admin access required' });
     return;
  }
  next();
};
