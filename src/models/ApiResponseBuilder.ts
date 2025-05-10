import { ErrorCode } from '../types/CustomError.types';

type ApiResponseStatus = 'success' | 'error';

interface BaseResponse<T> {
    status: ApiResponseStatus;
    message: string;
    payload?: T;
    code?: ErrorCode; // Nur bei Fehlern gesetzt
}

export class ApiResponseBuilder {
    static success<T>(message: string = 'Success', payload?: T): BaseResponse<T> {
        return {
            message,
            status: 'success',
            payload,
        };
    }

    static error<T>(
        message: string = 'An error occurred',
        code: ErrorCode = ErrorCode.INTERNAL_ERROR,
        payload?: T,
    ): BaseResponse<T> {
        return {
            status: 'error',
            message,
            code,
            payload,
        };
    }
}
