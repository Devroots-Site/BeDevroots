import * as PrismaClient from '../utils/Prisma';
import { DocumentationService } from './Documentation.service';
import { vi, describe, it, expect } from 'vitest';

describe('DocumentationService', () => {
  it('should return docs from prisma', async () => {
    const currentDate = new Date();
    vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([
      {
        id: 1,
        name: 'Doc 1',
        created_at: currentDate,
        updated_at: currentDate,
        description: 'Description 1',
        creator: 'Bastian',
        filepath: 'path/to/doc1',
        version: 'v1.0',
        keywords: ['keyword1'],
        picturepath: 'path/to/pic1',
      },
    ]);

    const data = await DocumentationService.getAllDocumentation();

    expect(data).toEqual([
      {
        id: 1,
        name: 'Doc 1',
        created_at: currentDate,
        updated_at: currentDate,
        description: 'Description 1',
        creator: 'Bastian',
        filepath: 'path/to/doc1',
        version: 'v1.0',
        keywords: ['keyword1'],
        picturepath: 'path/to/pic1',
      },
    ]);
  });
});
