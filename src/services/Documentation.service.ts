import { prisma } from '../utils/Prisma';
import { documentation } from '@prisma/client';

export class DocumentationService {
    public static async getAllDocumentation(): Promise<documentation[] | null> {
        const data = await prisma.documentation.findMany({ orderBy: { name: 'asc' } });
        return data;
    }
    public static async getAllActiveAndPublicDocumentation(): Promise<
        Array<Omit<documentation, 'is_active' | 'is_public'>>
    > {
        const data = await prisma.documentation.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                version: true,
                created_at: true,
                updated_at: true,
                creator: true,
                filepath: true,
                picturepath: true,
                keywords: true,
            },
            where: {
                is_active: true,
                is_public: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return data;
    }

    public static async getAllKeywordsFromDocumentation(): Promise<string[]> {
        const data = await prisma.documentation.findMany({
            select: {
                keywords: true,
            },
        });
        const keywords = data.map((doc) => doc.keywords).flat();
        const uniqueKeywords = [...new Set(keywords)];

        return uniqueKeywords;
    }
}
