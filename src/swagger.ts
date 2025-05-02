import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Meine API',
    description: 'API-Dokumentation mit Swagger und TypeScript',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/user.routes.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
