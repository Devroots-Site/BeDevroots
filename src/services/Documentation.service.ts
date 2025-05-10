import { prisma } from '../utils/Prisma';
import { documentation } from '@prisma/client';

export class DocumentationService {
    public static async getAllDocumentation(): Promise<documentation[] | null> {
        const data = await prisma.documentation.findMany({ orderBy: { name: 'asc' } });
        return data;
    }
}
