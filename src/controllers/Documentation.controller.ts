import { prisma } from '../utils/Prisma';
import { DocumentationService } from '../services/Documentation.service';
import { CustomError } from '../models/CustomError';
import { ErrorCode } from '../types/CustomError.types';
import { Request, Response, NextFunction } from 'express';

/**
 * DocumentationController
 * Controll the api request and send the data back
 */
export class DocumentationController {
  public static async getAllDocs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await DocumentationService.getAllDocumentation();

      if (!data || data.length === 0) {
        throw new CustomError('No documents found', ErrorCode.DOCUMENT_NOT_FOUND, 200);
      }

      res.status(200).json({
        code: 'OK',
        message: 'Documents retrieved successfully',
        data,
      });
    } catch (error) {
      if (error instanceof CustomError && error.statusCode === 200) {
        res.status(200).json({
          code: error.code,
          message: error.message,
          details: error.details,
          data: null,
        });
      } else {
        next(error);
      }
    }
  }
}
