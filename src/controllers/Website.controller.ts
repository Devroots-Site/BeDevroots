import { CustomError } from '../models/CustomError';
import { WebsiteService } from '../services/Website.service';
import { ErrorCode } from '../types/CustomError.types';
import { Request, Response } from 'express';

export class WebsiteController {
  public static async getAllWebsites(req: Request, res: Response) {
    try {
      const websites = await WebsiteService.findAllWebsites();
      if (!websites || websites.length === 0) {
        throw new CustomError('No websites found', ErrorCode.DATA_NOT_FOUND, 200);
      }
      res.status(200).json(websites);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      res.status(500).json({ message: 'Error fetching websites', error });
    }
  }

  public static async getWebsiteById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const website = await WebsiteService.findWebsiteById(Number(id));
      if (!website) {
        throw new CustomError('Website not found', ErrorCode.DATA_NOT_FOUND, 200);
      }
      res.status(200).json(website);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      res.status(500).json({ message: 'Error fetching website', error });
    }
  }
}
