import { Router, RequestHandler } from 'express';
import { SwaggerRouteEntry } from './CustomSwagger'; // Stelle sicher, dass dieses Interface exportiert ist

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface RouteOptions {
  method: HttpMethod;
  path: string;
  handler: RequestHandler;
  middlewares?: RequestHandler[];
  comment?: string;
  swagger: Omit<SwaggerRouteEntry, 'path' | 'method'>;
}

export class Routes {
  public router: Router;
  public basePath: string;
  public routes: RouteOptions[] = [];

  constructor(basePath: string, routes: RouteOptions[]) {
    this.router = Router();
    this.basePath = basePath;
    for (const config of routes) {
      this.addRoute(config);
    }
  }

  private addRoute(config: RouteOptions) {
    const { method, path, middlewares = [], handler } = config;
    (this.router as any)[method](path, ...middlewares, handler);
    this.routes.push(config);
  }

  public getSwaggerDocs(): SwaggerRouteEntry[] {
    return this.routes.map((route) => ({
      path: `${this.basePath}${route.path}`,
      method: route.method,
      summary: route.swagger.summary,
      description: route.swagger.description,
      tags: route.swagger.tags,
      responses: route.swagger.responses,
      parameters: route.swagger.parameters,
      requestBody: route.swagger.requestBody,
    }));
  }
}
