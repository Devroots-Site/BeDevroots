import { ErrorCode } from '../types/CustomError.types';

export class CustomError extends Error {
    public code: ErrorCode;
    public statusCode: number;
    public details?: unknown;

    constructor(message: string, code: ErrorCode, statusCode?: number, details?: unknown) {
        super(message);
        this.name = 'CustomError';
        this.code = code;
        this.statusCode = statusCode ?? 500; // Default to 500 if not provided
        this.details = details;

        // Maintains proper stack trace for where the error was thrown (only in V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}
