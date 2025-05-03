import { prisma } from '../utils/Prisma';

export class ToolService {
  public static async getAllTools(): Promise<any> {
    const tools = await prisma.tools.findMany({ orderBy: { name: 'asc' } });
    return tools;
  }

  public static async getToolById(id: number): Promise<any> {
    const tool = await prisma.tools.findUnique({
      where: { id },
    });
    return tool;
  }
}
