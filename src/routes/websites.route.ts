import { Request, Response, NextFunction } from 'express';
import { DocumentationController } from '../controllers/Documentation.controller';
import { IRoute } from '../types/routes.types';
import { ToolControler } from '../controllers/Tools.controller';
import { WebsiteController } from '../controllers/Website.controller';

const path = '/websites';

const routes: IRoute[] = [
  {
    routeName: `${path}/all`,
    method: 'get',
    controller: WebsiteController.getAllWebsites,
    comments: 'find all websites',
  },
  {
    routeName: `${path}/:id`,
    method: 'get',
    controller: WebsiteController.getWebsiteById,
    comments: 'find website by id',
  },
];

export { routes };
