import { prisma } from '../utils/Prisma';

export class DocumentationService {
  public static async getAllDocumentation() {
    const data = await prisma.documentation.findMany({ orderBy: { name: 'asc' } });
    return data;
  }
}
