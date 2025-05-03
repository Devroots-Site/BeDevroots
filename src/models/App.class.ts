import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from '../middlewares';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

dotenv.config();

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    if (process.env.NODE_ENV === 'production') {
      this.app.use(morgan('combined'));
    }
  }

  private async setupRoutes(): Promise<void> {
    this.app.get('/', (_req, res) => {
      res.send('API for devroots is online ✅');
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    const routesDir = path.join(__dirname, '..', 'routes');
    const files = fs.readdirSync(routesDir);

    for (const file of files) {
      if (file.endsWith('.route.ts') || file.endsWith('.route.js')) {
        const filePath = path.join(routesDir, file);

        // Dynamisches Importieren
        const routeModule = await import(filePath);

        const routes = routeModule.routes;
        if (!Array.isArray(routes)) continue;

        for (const route of routes) {
          const method = route.method.toLowerCase();
          const handler = (this.app as any)[method];

          if (typeof handler === 'function') {
            handler.call(this.app, route.routeName, route.controller);
            console.log(`🔗 [${method.toUpperCase()}] ${route.routeName} ✔`);
          } else {
            console.warn(`❌ Unsupported HTTP method: ${route.method}`);
          }
        }
      }
    }
  }

  public getInstance(): Application {
    return this.app;
  }

  public startServer(): void {
    const port = process.env.PORT || 3000;
    const env = process.env.NODE_ENV || 'development';
    const startTime = new Date().toLocaleString();

    this.app.listen(port, () => {
      console.log(`
  ========================================================
  🚀 API Server started
  --------------------------------------------------------
  🌐 URL:              http://localhost:${port}
  🧭 Enviroment:       ${env}
  🕒 Starttime:        ${startTime}
  📁 BasicRoute:       /
  --------------------------------------------------------
  📦 Version:          ${process.env.npm_package_version ?? 'unbekannt'}
  📘 Port:             ${port}
  📃 Documentation     http://localhost:${port}/api-docs
  ========================================================
      `);
    });
  }
}
