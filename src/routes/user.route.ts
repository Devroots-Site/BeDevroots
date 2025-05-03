import { IRoute } from '../types/routes.types';
import { UserController } from '../controllers/User.controller';

const path = '/auth';

const routes: IRoute[] = [
  {
    routeName: `${path}/login`,
    method: 'post',
    controller: UserController.login,
    comments: 'Login mit Email oder Username',
  },
  {
    routeName: `${path}/register`,
    method: 'post',
    controller: UserController.register,
    comments: 'User Registrierung',
  },
];

export { routes };
