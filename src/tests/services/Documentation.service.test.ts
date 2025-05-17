import * as PrismaClient from '../../utils/Prisma';
import { DocumentationService } from '../../services/Documentation.service';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { documentation } from '@prisma/client';

describe('DocumentationService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    describe('getAllDocumentation', () => {
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
                    is_active: true,
                    is_public: true,
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
                    is_active: true,
                    is_public: true,
                },
            ]);
        });

        it('should return an empty array if no docs found', async () => {
            vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([]);

            const data = await DocumentationService.getAllDocumentation();

            expect(data).toEqual([]);
        });
    });

    describe('getAllKeywordsFromDocumentation', () => {
        it('should return keywords from docs', async () => {
            vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([
                {
                    id: 1,
                    name: 'Doc A',
                    created_at: new Date(),
                    updated_at: new Date(),
                    description: null,
                    creator: null,
                    filepath: 'fake.pdf',
                    version: null,
                    keywords: ['keyword1', 'keyword2'],
                    picturepath: null,
                    is_active: true,
                    is_public: true,
                },
                {
                    id: 2,
                    name: 'Doc B',
                    created_at: new Date(),
                    updated_at: new Date(),
                    description: null,
                    creator: null,
                    filepath: 'fake2.pdf',
                    version: null,
                    keywords: ['keyword3'],
                    picturepath: null,
                    is_active: true,
                    is_public: true,
                },
            ] as documentation[]);

            const data = await DocumentationService.getAllKeywordsFromDocumentation();
            expect(data).toEqual(['keyword1', 'keyword2', 'keyword3']);
        });

        it('should return an empty array if no keywords found', async () => {
            vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([]);

            const data = await DocumentationService.getAllKeywordsFromDocumentation();
            expect(data).toEqual([]);
        });
    });
});
