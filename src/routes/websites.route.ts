import { WebsiteController } from '../controllers/Website.controller';
import { Routes } from '../models/Routes.class';

const path = '/websites';

const routes = new Routes(path, [
    {
        path: '/all',
        method: 'get',
        handler: WebsiteController.getAllWebsites,
        comment: 'Find all websites',
        swagger: {
            summary: 'Get all websites',
            description: 'Returns a list of all websites',
            tags: ['Websites'],
            responses: {
                200: {
                    description: 'Websites fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: {
                                        type: 'string',
                                        example: 'Websites fetched successfully',
                                    },
                                    payload: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number', example: 1 },
                                                name: {
                                                    type: 'string',
                                                    example: 'Example Website',
                                                },
                                                link: {
                                                    type: 'string',
                                                    example: 'https://example.com',
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-01-01T00:00:00Z',
                                                },
                                                updatedAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-01-01T00:00:00Z',
                                                },
                                                keywords: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                    },
                                                    example: [
                                                        'seo',
                                                        'marketing',
                                                        'development',
                                                        'example keyword',
                                                    ],
                                                },
                                                is_active: {
                                                    type: 'boolean',
                                                    example: true,
                                                },
                                                is_public: {
                                                    type: 'boolean',
                                                    example: true,
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
                                    status: { type: 'string', example: 'error' },
                                    message: {
                                        type: 'string',
                                        example:
                                            'An unexpected error occurred. On Route /websites/all',
                                    },
                                    code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
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
        handler: WebsiteController.getPublicAndActiveWebsites,
        comment: 'Find all public websites',
        swagger: {
            summary: 'Get all public websites',
            description: 'Returns a list of all public websites',
            tags: ['Websites'],
            responses: {
                200: {
                    description: 'Public websites fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: {
                                        type: 'string',
                                        example: 'Public websites fetched successfully',
                                    },
                                    payload: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'number', example: 1 },
                                                name: {
                                                    type: 'string',
                                                    example: 'Example Website',
                                                },
                                                link: {
                                                    type: 'string',
                                                    example: 'https://example.com',
                                                },
                                                createdAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-01-01T00:00:00Z',
                                                },
                                                updatedAt: {
                                                    type: 'string',
                                                    format: 'date-time',
                                                    example: '2023-01-01T00:00:00Z',
                                                },
                                                keywords: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'string',
                                                    },
                                                    example: [
                                                        'seo',
                                                        'marketing',
                                                        'development',
                                                        'example keyword',
                                                    ],
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
                    description: 'An unexpected error occurred. On Route /websites/public/',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'error' },
                                    message: {
                                        type: 'string',
                                        example:
                                            'An unexpected error occurred. On Route /websites/public/all',
                                    },
                                    code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    {
        path: '/keywords/all',
        method: 'get',
        handler: WebsiteController.getAllKeywords,
        comment: 'Find all keywords',
        swagger: {
            summary: 'Get all keywords',
            description: 'Returns a list of all keywords',
            tags: ['Websites'],
            responses: {
                200: {
                    description: 'Keywords fetched successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: {
                                        type: 'string',
                                        example: 'Keywords fetched successfully',
                                    },
                                    payload: {
                                        type: 'array',
                                        items: { type: 'string' },
                                        example: [
                                            'seo',
                                            'marketing',
                                            'development',
                                            'example keyword',
                                        ],
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
                                    status: { type: 'string', example: 'error' },
                                    message: {
                                        type: 'string',
                                        example:
                                            'An unexpected error occurred. On Route /websites/keywords/all',
                                    },
                                    code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
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
