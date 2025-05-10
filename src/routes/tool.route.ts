import { ToolControler } from '../controllers/Tools.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { Routes } from '../models/Routes.class';
import { unauthorizedResponse, unknownServerErrorResponse } from '../swagger/errorCodes.swagger';

const path = '/tools';

const routes = new Routes(path, [
    {
        path: '/all',
        method: 'get',
        handler: ToolControler.getAllTools,
        comment: 'find all tools',
        swagger: {
            summary: 'find all tools',
            description:
                'Returns a standardized API response containing an array of tools. If no tools are found in the database, the payload is an empty array.',
            tags: ['Tools'],
            responses: {
                200: {
                    description: 'All tools found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'success' },
                                    message: {
                                        type: 'string',
                                        example: 'Tools retrieved successfully',
                                    },
                                    payload: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer', example: 9 },
                                                name: { type: 'string', example: 'PDF CLI Tool' },
                                                language: { type: 'string', example: 'Python' },
                                                keywords: {
                                                    type: 'array',
                                                    items: { type: 'string' },
                                                    example: ['pdf', 'cli', 'python'],
                                                },
                                                link: {
                                                    type: 'array',
                                                    items: { type: 'string', format: 'uri' },
                                                    example: [
                                                        'https://github.com/Personal-DevTools/cli-pdf',
                                                    ],
                                                },
                                                author: {
                                                    type: 'string',
                                                    example: 'Bichler Bastian',
                                                },
                                                updated_at: { type: 'string', format: 'date-time' },
                                                created_at: { type: 'string', format: 'date-time' },
                                                picturepath: {
                                                    type: 'string',
                                                    nullable: true,
                                                    example: null,
                                                },
                                            },
                                            required: [
                                                'id',
                                                'name',
                                                'language',
                                                'keywords',
                                                'link',
                                                'author',
                                                'updated_at',
                                                'created_at',
                                            ],
                                        },
                                    },
                                },
                                required: ['status', 'message', 'payload'],
                            } as const, // Fix: Add 'as const' to ensure compatibility with the expected type
                        },
                    },
                },
                500: unknownServerErrorResponse,
            },
        },
    },

    {
        path: '/:id',
        method: 'get',
        handler: ToolControler.getToolById,
        middlewares: [authenticate],
        comment: 'find tool by id',
        swagger: {
            summary: 'find tool by id',
            description: 'Find tool by ID. <b>Authentication is required</b>.',
            tags: ['Tools'],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the tool to retrieve',
                    schema: {
                        type: 'string',
                        example: '1',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Tool found or not found in DB',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'string',
                                        enum: ['success', 'error'],
                                        example: 'success',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Tool retrieved successfully"',
                                    },
                                    payload: {
                                        oneOf: [
                                            {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'integer', example: 9 },
                                                    name: {
                                                        type: 'string',
                                                        example: 'PDF CLI Tool',
                                                    },
                                                    language: { type: 'string', example: 'Python' },
                                                    keywords: {
                                                        type: 'array',
                                                        items: { type: 'string' },
                                                        example: ['pdf', 'cli', 'python'],
                                                    },
                                                    link: {
                                                        type: 'array',
                                                        items: { type: 'string', format: 'uri' },
                                                        example: [
                                                            'https://github.com/Personal-DevTools/cli-pdf',
                                                        ],
                                                    },
                                                    author: {
                                                        type: 'string',
                                                        example: 'Bichler Bastian',
                                                    },
                                                    updated_at: {
                                                        type: 'string',
                                                        format: 'date-time',
                                                    },
                                                    created_at: {
                                                        type: 'string',
                                                        format: 'date-time',
                                                    },
                                                    picturepath: {
                                                        type: 'string',
                                                        nullable: true,
                                                        example: null,
                                                    },
                                                },
                                                required: [
                                                    'id',
                                                    'name',
                                                    'language',
                                                    'keywords',
                                                    'link',
                                                    'author',
                                                    'updated_at',
                                                    'created_at',
                                                ],
                                            },
                                            { type: 'object', nullable: true, example: null },
                                        ],
                                    },
                                },
                                required: ['status', 'message', 'payload'],
                            } as const, // Fix: Add 'as const' to ensure compatibility with the expected type
                        },
                    },
                },
                401: unauthorizedResponse,
                500: unknownServerErrorResponse,
            },
        },
    },
]);

export { routes };
