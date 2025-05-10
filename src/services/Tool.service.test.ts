import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ToolService } from './Tools.service';
import { prisma } from '../utils/Prisma';

vi.mock('../utils/Prisma', () => ({
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
});
