import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorCode } from '../types/CustomError.types';
import { ApiResponseBuilder } from '../models/ApiResponseBuilder';

// Optional: Interface erweitern für req.user
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(401)
      .json(
        ApiResponseBuilder.error(
          'Access denied. No token provided.',
          ErrorCode.ACCESS_DENIED_NO_TOKEN,
        ),
      );
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.JWT_SECRET) {
    res
      .status(500)
      .json(
        ApiResponseBuilder.error(
          'JWT secret is not configured on the server.',
          ErrorCode.INTERNAL_SERVER_ERROR,
        ),
      );
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res
        .status(401)
        .json(ApiResponseBuilder.error('Invalid token.', ErrorCode.ACCESS_DENIED_NO_TOKEN));
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res
      .status(401)
      .json(ApiResponseBuilder.error('Token expired or invalid.', ErrorCode.TOKEN_EXPIRED));
  }
};
