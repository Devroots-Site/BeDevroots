import { DocumentationService } from '../services/Documentation.service';
import { CustomError } from '../models/CustomError';
import { ErrorCode } from '../types/CustomError.types';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseBuilder } from '@/models/ApiResponseBuilder';

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

            res.status(200).json(
                ApiResponseBuilder.success('Documents retrieved successfully', data),
            );
        } catch (error) {
            next(error);
        }
    }

    public static async getAllActiveAndPublicDocs(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        {
            try {
                const data = await DocumentationService.getAllActiveAndPublicDocumentation();

                res.status(200).json(
                    ApiResponseBuilder.success('Documents retrieved successfully', data),
                );
            } catch (error) {
                next(error);
            }
        }
    }

    public static async getAllKeywordsFromDocs(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const data = await DocumentationService.getAllKeywordsFromDocumentation();

            res.status(200).json(
                ApiResponseBuilder.success('Documents retrieved successfully', data),
            );
        } catch (error) {
            next(error);
        }
    }
}
