import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ErrorCode } from '../types/CustomError.types';
import { ApiResponseBuilder } from '../models/ApiResponseBuilder';

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = tokenFromHeader || req.cookies?.token; // 🔐 Cookie bevorzugt

    if (!token) {
        res.status(401).json(
            ApiResponseBuilder.error('Access denied.', ErrorCode.UNAUTHORIZED_ACCESS),
        );
        return;
    }

    if (!process.env.JWT_SECRET) {
        res.status(500).json(
            ApiResponseBuilder.error(
                'JWT secret is not configured on the server.',
                ErrorCode.INTERNAL_SERVER_ERROR,
            ),
        );
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json(
            ApiResponseBuilder.error('Token expired or invalid.', ErrorCode.TOKEN_EXPIRED),
        );
    }
};
