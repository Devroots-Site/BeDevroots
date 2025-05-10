import { Routes } from '@/models/Routes.class';
import { DocumentationController } from '../controllers/Documentation.controller';

const path = '/documentation';

const routes = new Routes(path, [
    {
        path: '/all',
        method: 'get',
        handler: DocumentationController.getAllDocs,
        comment: 'Get all documentation',
        swagger: {
            tags: ['Documentation'],
            summary: 'Get all documentation',
            description: 'Get all documentation',
            responses: {
                200: {
                    description: 'Documents retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    payload: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number' },
                                                name: { type: 'string' },
                                                description: { type: 'string' },
                                                version: { type: 'string' },
                                                created_at: { type: 'string', format: 'date-time' },
                                                updated_at: { type: 'string', format: 'date-time' },
                                                creator: { type: 'string' },
                                                filepath: { type: 'string' },
                                                picturepath: { type: 'string' },
                                                keywords: {
                                                    type: 'array',
                                                    items: { type: 'string' },
                                                },
                                                is_public: { type: 'boolean' },
                                                is_active: { type: 'boolean' },
                                            },
                                        },
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
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    code: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    {
        path: '/public/all',
        method: 'get',
        handler: DocumentationController.getAllActiveAndPublicDocs,
        comment: 'Get all active and public documentation',
        swagger: {
            tags: ['Documentation'],
            summary: 'Get all active and public documentation',
            description: 'Get all active and public documentation',
            responses: {
                200: {
                    description: 'Documents retrieved successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    payload: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number' },
                                                name: { type: 'string' },
                                                description: { type: 'string' },
                                                version: { type: 'string' },
                                                created_at: { type: 'string', format: 'date-time' },
                                                updated_at: { type: 'string', format: 'date-time' },
                                                creator: { type: 'string' },
                                                filepath: { type: 'string' },
                                                picturepath: { type: 'string' },
                                                keywords: {
                                                    type: 'array',
                                                    items: { type: 'string' },
                                                },
                                            },
                                        },
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
                                    status: { type: 'string' },
                                    message: { type: 'string' },
                                    code: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
]);

export { routes };
