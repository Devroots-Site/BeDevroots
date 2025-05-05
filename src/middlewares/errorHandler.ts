import { ErrorRequestHandler } from 'express';
import { CustomError } from '../models/CustomError';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message + (req.originalUrl ? ` On Route: ${req.originalUrl}` : ''),
    });
    return _next();
  }

  console.error('Unhandled error:', err);

  res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: `An unexpected error occurred. On Route: ${req.originalUrl}`,
  });
  return _next();
};
