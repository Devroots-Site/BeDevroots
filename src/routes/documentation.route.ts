import { Request, Response, NextFunction } from 'express';
import { DocumentationController } from '../controller/Documentation.controller';
import { IRoute } from '../types/routes.types';

const path = '/documentation';

const routes: IRoute[] = [
  {
    routeName: `${path}/all`,
    method: 'get',
    controller: DocumentationController.getAllDocs,
    comments: 'Get all documentation',
  },
];

export { routes };
