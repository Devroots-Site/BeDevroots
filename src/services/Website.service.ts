import { prisma } from '../utils/Prisma';

export class WebsiteService {
  public static async findAllWebsites() {
    return await prisma.websites.findMany();
  }
  public static async findWebsiteById(id: number) {
    return await prisma.websites.findUnique({
      where: {
        id,
      },
    });
  }
}
