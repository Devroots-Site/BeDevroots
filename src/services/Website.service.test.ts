import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebsiteService } from './Website.service';
import { prisma } from '../utils/Prisma';

vi.mock('../utils/Prisma', () => ({
    prisma: {
        websites: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
        },
    },
}));

describe('WebsiteService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return all websites', async () => {
        const mockWebsites = [
            { id: 1, url: 'https://example.com' },
            { id: 2, url: 'https://test.com' },
        ];
        (prisma.websites.findMany as any).mockResolvedValue(mockWebsites);

        const result = await WebsiteService.findAllWebsites();
        expect(prisma.websites.findMany).toHaveBeenCalled();
        expect(result).toEqual(mockWebsites);
    });

    it('should return a website by ID', async () => {
        const mockWebsite = { id: 1, url: 'https://example.com' };
        (prisma.websites.findUnique as any).mockResolvedValue(mockWebsite);

        const result = await WebsiteService.findWebsiteById(1);
        expect(prisma.websites.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(mockWebsite);
    });

    it('should return null if website not found', async () => {
        (prisma.websites.findUnique as any).mockResolvedValue(null);

        const result = await WebsiteService.findWebsiteById(999);
        expect(prisma.websites.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
        expect(result).toBeNull();
    });
});
