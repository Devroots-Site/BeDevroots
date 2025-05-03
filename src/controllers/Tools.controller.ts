import { CustomError } from '../models/CustomError';
import { ToolService } from '../services/Tools.service';
import { ErrorCode } from '../types/CustomError.types';
import { Request, Response } from 'express';

export class ToolControler {
  public static async getAllTools(req: Request, res: Response) {
    try {
      const tools = await ToolService.getAllTools();
      if (!tools || tools.length === 0) {
        throw new CustomError('No tools found', ErrorCode.TOOLS_NOT_FOUND);
      }
      res.status(200).json(tools);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      res.status(500).json({ error: 'found all Tools' });
    }
  }

  public static async getToolById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (typeof id !== 'string' || isNaN(Number(id))) {
        throw new CustomError('Invalid ID format', ErrorCode.INVALID_ID_FORMAT, 400);
      }
      const tool = await ToolService.getToolById(Number(id));
      if (!tool) {
        throw new CustomError('Tool not found', ErrorCode.TOOLS_NOT_FOUND, 200);
      }
      res.status(200).json(tool);
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ code: error.code, error: error.message });
      }
      res.status(500).json({ error: 'Error on find tool by Id' });
    }
  }
}
