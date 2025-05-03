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
}
