import { ToolControler } from '../controllers/Tools.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { Routes } from '../models/Routes.class';

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
                  message: { type: 'string', example: 'Tools retrieved successfully' },
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
                          example: ['https://github.com/Personal-DevTools/cli-pdf'],
                        },
                        author: { type: 'string', example: 'Bichler Bastian' },
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
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'error' },
                  message: {
                    type: 'string',
                    example: 'An unexpected error occurred. On Route: /tools/all',
                  },
                  code: { type: 'string', example: 'INTERNAL_SERVER_ERROR' },
                },
                required: ['status', 'message', 'code'],
              },
            },
          },
        },
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
      description: 'find tool by id. <b>But you must be logged in</b>',
      tags: ['Tools'],
      responses: {
        200: { description: 'Tool found' },
        401: { description: 'Unauthorized' },
        404: { description: 'Tool not found' },
        500: { description: 'Internal Server Error' },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the tool to retrieve',
          schema: {
            type: 'string',
            example: '1234567890abcdef',
          },
        },
      ],
    },
  },
]);

export { routes };
