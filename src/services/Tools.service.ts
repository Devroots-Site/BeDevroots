import { prisma } from '../utils/Prisma';
import { tools } from '@prisma/client';

export class ToolService {
    public static async getAllTools(): Promise<tools[] | null> {
        const tools = await prisma.tools.findMany({ orderBy: { name: 'asc' } });
        return tools;
    }

    public static async getToolById(id: number): Promise<tools | null> {
        const tool = await prisma.tools.findUnique({
            where: { id },
        });
        return tool;
    }

    public static async getAllActiveAndPublicTools(): Promise<
        Array<Omit<tools, 'is_active' | 'is_public'>>
    > {
        const tools = await prisma.tools.findMany({
            select: {
                id: true,
                name: true,
                language: true,
                keywords: true,
                link: true,
                author: true,
                updated_at: true,
                created_at: true,
                picturepath: true,
            },
            where: {
                is_active: true,
                is_public: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
        return tools;
    }
}
