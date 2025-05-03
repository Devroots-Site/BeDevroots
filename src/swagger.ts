import { OpenAPIV3 } from 'openapi-types';

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'BeDevroots API',
    version: '1.0.0',
    description: 'Manuell definierte Swagger-Dokumentation für Testzwecke',
  },
  paths: {
    '/hello': {
      get: {
        summary: 'Hello World Testroute',
        tags: ['Test'],
        responses: {
          '200': {
            description: 'Erfolgreiche Antwort',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hello, world!',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
