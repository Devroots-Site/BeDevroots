import { OpenAPIV3 } from 'openapi-types';

const unauthorizedResponse: OpenAPIV3.ResponseObject = {
    description: 'Unauthorized',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['error'],
                        example: 'error',
                    },
                    message: {
                        type: 'string',
                        example: 'Access denied',
                    },
                    code: {
                        type: 'string',
                        example: 'UNAUTHORIZED_ACCESS',
                    },
                },
                required: ['status', 'message', 'code'],
            },
        },
    },
};

const wrongLoginResponse: OpenAPIV3.ResponseObject = {
    description: 'Invalid login credentials',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['error'],
                        example: 'error',
                    },
                    message: {
                        type: 'string',
                        example: 'invalid credentials',
                    },
                    code: {
                        type: 'string',
                        example: 'INVALID_CREDENTIALS',
                    },
                },
                required: ['status', 'message', 'code'],
            },
        },
        'test/plain': {
            schema: {
                type: 'string',
                example: 'invalid credentials',
            },
        },
    },
};

const unknownServerErrorResponse: OpenAPIV3.ResponseObject = {
    description: 'Unknown server error',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                        enum: ['error'],
                        example: 'error',
                    },
                    message: {
                        type: 'string',
                        example: 'An unexpected error occurred. On Route: /api/v1/tools',
                    },
                    code: {
                        type: 'string',
                        example: 'INTERNAL_SERVER_ERROR',
                    },
                },
                required: ['status', 'message', 'code'],
            },
        },
    },
};

export { unauthorizedResponse, unknownServerErrorResponse, wrongLoginResponse };
