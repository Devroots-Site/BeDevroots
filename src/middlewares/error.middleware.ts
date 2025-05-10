import { ErrorRequestHandler } from 'express';
import { CustomError } from '../models/CustomError';
import { ApiResponseBuilder } from '../models/ApiResponseBuilder';
import { ErrorCode } from '../types/CustomError.types';

export const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json(
            ApiResponseBuilder.error(err.message, err.code, err.details),
        );
        return;
    }

    console.error(err);
    res.status(500).json(
        ApiResponseBuilder.error(
            `An unexpected error occurred. On Route ${req.originalUrl}`,
            ErrorCode.INTERNAL_SERVER_ERROR,
        ),
    );
    next();
};
