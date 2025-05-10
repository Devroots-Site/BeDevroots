import * as PrismaClient from '../../utils/Prisma';
import { DocumentationService } from '../../services/Documentation.service';
import { vi, describe, it, expect } from 'vitest';

describe('DocumentationService', () => {
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
        it('should return an empy array if no docs found', async () => {
            vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([]);

            const data = await DocumentationService.getAllDocumentation();

            expect(data).toEqual([]);
        });
        describe('getAllActiveAndPublicDocumentation', () => {
            it('should return active and public docs from prisma', async () => {
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

                const data = await DocumentationService.getAllActiveAndPublicDocumentation();

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
        it('should return an empty array if no active and public docs found', async () => {
            vi.spyOn(PrismaClient.prisma.documentation, 'findMany').mockResolvedValue([]);

            const data = await DocumentationService.getAllActiveAndPublicDocumentation();

            expect(data).toEqual([]);
        });
    });
});
