import { NextFunction, Request, Response } from 'express';

export type ControllerHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export interface IRoute {
  routeName: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  controller: ControllerHandler;
  comments?: string;
}
