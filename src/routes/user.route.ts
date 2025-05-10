import { UserController } from '../controllers/User.controller';
import { RequestHandler } from 'express';
import { Routes } from '../models/Routes.class';
import { wrongLoginResponse } from '../swagger/errorCodes.swagger';

const path = '/auth';

const routes = new Routes(path, [
    {
        path: '/login',
        method: 'post',
        handler: UserController.login as RequestHandler,
        comment: 'Login with Email or Username',
        swagger: {
            summary: 'Login with Email or Username',
            description: 'authenticates a user with email or username and password.',
            tags: ['Auth'],
            responses: {
                200: {
                    description: 'Login success',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'success',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Login successful',
                                    },
                                    payload: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'string',
                                                        example: '12345',
                                                    },
                                                    email: {
                                                        type: 'string',
                                                        example: 'example@company.com',
                                                    },
                                                    username: {
                                                        type: 'string',
                                                        example: 'exampleUser',
                                                    },
                                                },
                                                required: ['id', 'email', 'username'],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email/Username and password are required.',
                                    },
                                    code: {
                                        type: 'string',
                                        example: 'EMAIL_USERNAME_AND_PASSWORD_REQUIRED',
                                    },
                                },
                            },
                        },
                    },
                },

                401: wrongLoginResponse,
            },
            parameters: [], // Leere Parameter, da nur body verwendet wird
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'user@example.com',
                                },
                                password: {
                                    type: 'string',
                                    example: '********',
                                },
                            },
                            required: ['email', 'password'],
                        },
                    },
                },
            },
        },
    },
    {
        path: '/register',
        method: 'post',
        handler: UserController.register as RequestHandler,
        comment: 'Register a new user',
        swagger: {
            summary: 'Register a new user',
            description: 'Registers a new user using email, username, and password.',
            tags: ['Auth'],
            responses: {
                201: {
                    description: 'User successfully registered',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'success',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'User registered successfully',
                                    },
                                    payload: {
                                        type: 'object',
                                        properties: {
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'string',
                                                        example: '12345',
                                                    },
                                                    email: {
                                                        type: 'string',
                                                        example: 'newuser@example.com',
                                                    },
                                                    username: {
                                                        type: 'string',
                                                        example: 'newuser',
                                                    },
                                                },
                                                required: ['id', 'email', 'username'],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Missing required fields (email, username, or password)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Email, username, and password are required.',
                                    },
                                    code: {
                                        type: 'string',
                                        example: 'REGISTER_ERROR',
                                    },
                                },
                            },
                        },
                    },
                },
                409: {
                    description: 'User already exists',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'User already exists',
                                    },
                                    code: {
                                        type: 'string',
                                        example: 'USER_ALREADY_EXISTS',
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        example: 'error',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal server error',
                                    },
                                    code: {
                                        type: 'string',
                                        example: 'INTERNAL_SERVER_ERROR',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            parameters: [],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    example: 'newuser@example.com',
                                },
                                username: {
                                    type: 'string',
                                    example: 'newuser',
                                },
                                password: {
                                    type: 'string',
                                    example: 'securePassword123',
                                },
                            },
                            required: ['email', 'username', 'password'],
                        },
                    },
                },
            },
        },
    },
]);

export { routes };
