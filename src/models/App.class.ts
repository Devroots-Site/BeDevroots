import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from '../middlewares';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';

import CustomSwagger from './CustomSwagger';
import { errorHandler } from '../middlewares/errorHandler';

dotenv.config();

export class App {
    public app: Application;
    private swagger: CustomSwagger;

    constructor() {
        this.app = express();
        this.swagger = new CustomSwagger(
            'BeDevroots API',
            '1.0.0',
            'Automatisch generierte API-Doku',
        );
        this.setupMiddleware();
        this.setupRoutes();
        this.app.use(cookieParser()); // Middleware for parsing cookies
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

        const routesDir = path.join(__dirname, '..', 'routes');
        const files = fs.readdirSync(routesDir);

        for (const file of files) {
            if (file.endsWith('.route.ts') || file.endsWith('.route.js')) {
                const filePath = path.join(routesDir, file);
                const routeModule = await import(filePath);

                const routeObject = routeModule.routes;

                if (!routeObject?.router || !routeObject?.getSwaggerDocs) continue;

                this.app.use(routeObject.basePath, routeObject.router);
                this.swagger.addRoutes(routeObject.getSwaggerDocs());

                console.log(`🔗 [ROUTE] ${routeObject.basePath} ✔`);
            }
        }

        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swagger.build()));
        this.app.use(errorHandler);
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
