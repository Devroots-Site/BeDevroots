import { NextFunction, Request, Response } from 'express';

export type ControllerHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction,
) => Promise<void>;

export interface IRoute {
  routeName: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  controller: ControllerHandler;
  comments?: string;
}
