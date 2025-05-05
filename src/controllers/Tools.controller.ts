import { ApiResponseBuilder } from '../models/ApiResponseBuilder';
import { CustomError } from '../models/CustomError';
import { ToolService } from '../services/Tools.service';
import { ErrorCode } from '../types/CustomError.types';
import { Request, Response } from 'express';

export class ToolControler {
  public static async getAllTools(req: Request, res: Response) {
    try {
      const tools = await ToolService.getAllTools();

      if (!tools || tools.length === 0) {
        throw new CustomError('No tools found', ErrorCode.TOOLS_NOT_FOUND, 404);
      }

      res.status(200).json(ApiResponseBuilder.success('Tools retrieved successfully', tools));
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(ApiResponseBuilder.error(error.message, error.code));
      } else {
        res
          .status(500)
          .json(
            ApiResponseBuilder.error('Unexpected server error', ErrorCode.INTERNAL_SERVER_ERROR),
          );
      }
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
      res.status(200).json(ApiResponseBuilder.success(`Tool find with id: ${id}`, tool));
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json(ApiResponseBuilder.error(error.message, error.code));
      }
      res
        .status(500)
        .json(ApiResponseBuilder.error('Unexpected server error', ErrorCode.INTERNAL_SERVER_ERROR));
    }
  }
}
