import { prisma } from '../utils/Prisma';
import { websites } from '@prisma/client';

export class WebsiteService {
    public static async findAllWebsites(): Promise<websites[] | null> {
        return await prisma.websites.findMany();
    }
    public static async findPublicAndActiveWebsites(): Promise<
        Array<Omit<websites, 'is_active' | 'is_public'>>
    > {
        return await prisma.websites.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                link: true,
                keywords: true,
                createdAt: true,
                updatedAt: true,
            },
            where: {
                is_active: true,
                is_public: true,
            },
        });
    }

    public static async findWebsiteById(id: number): Promise<websites | null> {
        return await prisma.websites.findUnique({
            where: {
                id,
            },
        });
    }

    public static async findAllKeywords(): Promise<string[]> {
        const keywords = await prisma.websites.findMany({
            select: {
                keywords: true,
            },
        });

        return keywords.map((website) => website.keywords).flat();
    }
}
