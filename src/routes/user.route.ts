import { UserController } from '../controllers/User.controller';
import { RequestHandler } from 'express';
import { Routes } from '../models/Routes.class';

const path = '/auth';

const routes = new Routes(path, [
  {
    path: '/login',
    method: 'post',
    handler: UserController.login as RequestHandler,
    comment: 'Login mit Email oder Username',
    swagger: {
      summary: 'Login mit Email oder Username',
      description: 'Authentifiziert den Benutzer anhand seiner E-Mail und Passwort.',
      tags: ['Auth'],
      responses: {
        200: { description: 'Login erfolgreich' },
        401: { description: 'Ungültige Zugangsdaten' },
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
    comment: 'Benutzer registrieren',
    swagger: {
      summary: 'Registrierung eines neuen Benutzers',
      description: 'Registriert einen neuen Benutzer mit E-Mail und Passwort.',
      tags: ['Auth'],
      responses: {
        201: { description: 'Benutzer erfolgreich registriert' },
        400: { description: 'Ungültige Eingabe' },
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
                password: {
                  type: 'string',
                  example: 'securePassword123',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
    },
  },
]);

export { routes };
