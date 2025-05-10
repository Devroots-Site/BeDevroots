import { UserController } from './controllers/User.controller';
import express from 'express';

const app = express();
app.use(express.json());
app.post('/auth/login', UserController.login);
app.post('/auth/register', UserController.register);
export default app;
