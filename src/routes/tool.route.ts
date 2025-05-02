import { Request, Response, NextFunction } from 'express';
import { DocumentationController } from '../controller/Documentation.controller';
import { IRoute } from '../types/routes.types';
import { ToolControler } from '../controller/Tools.controller';

const path = '/tools';

const routes: IRoute[] = [
  {
    routeName: `${path}/all`,
    method: 'get',
    controller: ToolControler.getAllTools,
    comments: 'find all tools',
  },
  {
    routeName: `${path}/:id`,
    method: 'get',
    controller: ToolControler.getToolById,
    comments: 'find tool by id',
  },
];

export { routes };
