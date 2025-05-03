import { IRoute } from '../types/routes.types';
import { ToolControler } from '../controllers/Tools.controller';
import { authenticate } from '../middlewares/auth.middleware';

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
    middlewares: [authenticate],
    comments: 'find tool by id',
  },
];

export { routes };
