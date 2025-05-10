import { describe, it, expect } from 'vitest';
import { ApiResponseBuilder } from './ApiResponseBuilder';
import { ErrorCode } from '../types/CustomError.types';

describe('ApiResponseBuilder', () => {
    describe('success()', () => {
        it('should return a success response with message and payload', () => {
            const payload = { id: 1, name: 'Tool A' };
            const response = ApiResponseBuilder.success('Tool loaded', payload);

            expect(response).toEqual({
                status: 'success',
                message: 'Tool loaded',
                payload,
            });
        });

        it('should return a success response with default message and no payload', () => {
            const response = ApiResponseBuilder.success();

            expect(response.status).toBe('success');
            expect(response.message).toBe('Success');
            expect(response.payload).toBeUndefined();
        });
    });

    describe('error()', () => {
        it('should return an error response with message, code and payload', () => {
            const payload = { reason: 'Database down' };
            const response = ApiResponseBuilder.error(
                'Database error',
                ErrorCode.DATABASE_ERROR,
                payload,
            );

            expect(response).toEqual({
                status: 'error',
                message: 'Database error',
                code: ErrorCode.DATABASE_ERROR,
                payload,
            });
        });

        it('should return an error response with default values', () => {
            const response = ApiResponseBuilder.error();

            expect(response.status).toBe('error');
            expect(response.message).toBe('An error occurred');
            expect(response.code).toBe(ErrorCode.INTERNAL_ERROR);
            expect(response.payload).toBeUndefined();
        });
    });
});
