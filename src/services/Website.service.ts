import { prisma } from '../utils/Prisma';
import { websites } from '@prisma/client';

export class WebsiteService {
    public static async findAllWebsites(): Promise<websites[] | null> {
        return await prisma.websites.findMany();
    }
    public static async findWebsiteById(id: number): Promise<websites | null> {
        return await prisma.websites.findUnique({
            where: {
                id,
            },
        });
    }
}
