import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../utils/Prisma';
import { WebsiteService } from '../../services/Website.service';

vi.mock('@/utils/Prisma', () => ({
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
    describe('findAllWebsites', () => {
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

    describe('findAllActiveAndPublicWebsites', () => {
        it('should return all active and public websites', async () => {
            const mockWebsites = [
                { id: 1, url: 'https://example.com', is_active: true, is_public: true },
                { id: 2, url: 'https://test.com', is_active: true, is_public: true },
            ];
            (prisma.websites.findMany as any).mockResolvedValue(mockWebsites);

            const result = await WebsiteService.findPublicAndActiveWebsites();

            expect(prisma.websites.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: {
                        is_active: true,
                        is_public: true,
                    },
                    select: expect.objectContaining({
                        id: true,
                        name: true,
                        description: true,
                        link: true,
                        keywords: true,
                        createdAt: true,
                        updatedAt: true,
                    }),
                }),
            );

            expect(result).toEqual(mockWebsites);
        });
        it('should return an empty array if no active and public websites', async () => {
            (prisma.websites.findMany as any).mockResolvedValue([]);

            const result = await WebsiteService.findPublicAndActiveWebsites();

            expect(prisma.websites.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        link: true,
                        keywords: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                    where: {
                        is_active: true,
                        is_public: true,
                    },
                }),
            );

            expect(result).toEqual([]);
        });
        it('should handle errors gracefully', async () => {
            (prisma.websites.findMany as any).mockRejectedValue(new Error('Database error'));

            await expect(WebsiteService.findPublicAndActiveWebsites()).rejects.toThrow(
                'Database error',
            );

            expect(prisma.websites.findMany).toHaveBeenCalled();
        });
    });
});
