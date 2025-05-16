import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToolService } from '@/services/Tools.service';
import { prisma } from '../../utils/Prisma';
import * as PrismaClient from '../../utils/Prisma';

vi.mock('@/utils/Prisma', () => ({
    prisma: {
        tools: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
        },
    },
}));
describe('ToolService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return all tools ordered by name', async () => {
        const mockTools = [
            { id: 1, name: 'Alpha' },
            { id: 2, name: 'Beta' },
        ];
        (prisma.tools.findMany as any).mockResolvedValue(mockTools);

        const result = await ToolService.getAllTools();
        expect(prisma.tools.findMany).toHaveBeenCalledWith({ orderBy: { name: 'asc' } });
        expect(result).toEqual(mockTools);
    });

    it('should return a tool by ID', async () => {
        const mockTool = { id: 1, name: 'Alpha' };
        (prisma.tools.findUnique as any).mockResolvedValue(mockTool);

        const result = await ToolService.getToolById(1);
        expect(prisma.tools.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(mockTool);
    });

    it('should return null if tool not found', async () => {
        (prisma.tools.findUnique as any).mockResolvedValue(null);

        const result = await ToolService.getToolById(999);
        expect(prisma.tools.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
        expect(result).toBeNull();
    });

    describe('getAllActiveAndPublicTools', () => {
        it('should return all active and public tools', async () => {
            const currentDate = new Date();

            vi.spyOn(PrismaClient.prisma.tools, 'findMany').mockResolvedValue([
                {
                    id: 1,
                    name: 'Alpha',
                    author: 'Author 1',
                    language: 'JavaScript',
                    created_at: currentDate,
                    updated_at: currentDate,
                    keywords: ['keyword1'],
                    link: ['https://example.com/alpha'],
                    is_active: true,
                    is_public: true,
                    picturepath: 'path/to/pic1',
                },
            ]);

            const result = await ToolService.getAllActiveAndPublicTools();
            expect(result).toEqual([
                {
                    id: 1,
                    name: 'Alpha',
                    language: 'JavaScript',
                    author: 'Author 1',
                    created_at: currentDate,
                    updated_at: currentDate,
                    keywords: ['keyword1'],
                    link: ['https://example.com/alpha'],
                    is_active: true,
                    is_public: true,
                    picturepath: 'path/to/pic1',
                },
            ]);
        });
        it('should return an empty array if no active and public tools found', async () => {
            (prisma.tools.findMany as any).mockResolvedValue([]);

            const result = await ToolService.getAllActiveAndPublicTools();
            expect(result).toEqual([]);
        });
    });
});
