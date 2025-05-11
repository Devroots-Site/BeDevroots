import { WebsiteService } from '@/services/Website.service';
import { beforeEach, describe, it, vi, expect } from 'vitest';
import request from 'supertest';
import app from 'src/testApp';

vi.mock('src/service/Website.service');

describe('WebsiteController Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {}); // suppress logs
    });
    describe('GET /websites/all', () => {
        it('should return all websites', async () => {
            const now = new Date();

            const mockWebsites = [
                {
                    id: 1,
                    name: 'Example Website',
                    description: 'This is an example website',
                    link: 'https://example.com',
                    createdAt: now,
                    updatedAt: now,
                    keywords: ['seo', 'marketing'],
                    is_active: true,
                    is_public: true,
                },
            ];

            vi.spyOn(WebsiteService, 'findAllWebsites').mockResolvedValue(mockWebsites);

            const response = await request(app).get('/websites/all');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Websites fetched successfully',
                payload: mockWebsites.map((site) => ({
                    ...site,
                    createdAt: site.createdAt.toISOString(),
                    updatedAt: site.updatedAt.toISOString(),
                })),
            });
        });

        it('should return 200 with empty array if no websites found', async () => {
            vi.spyOn(WebsiteService, 'findAllWebsites').mockResolvedValue([]);

            const response = await request(app).get('/websites/all');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Websites fetched successfully',
                payload: [],
            });
        });

        it('should return 500 if an error occurs', async () => {
            vi.spyOn(WebsiteService, 'findAllWebsites').mockRejectedValue(
                new Error('Database error'),
            );

            const response = await request(app).get('/websites/all');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                status: 'error',
                message: 'An unexpected error occurred. On Route /websites/all',
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });
    describe('GET /websites/public', () => {
        it('should return public and active websites', async () => {
            const now = new Date();

            const mockWebsites = [
                {
                    id: 1,
                    name: 'Public Website',
                    description: 'This is a public website',
                    link: 'https://public.com',
                    createdAt: now,
                    updatedAt: now,
                    keywords: ['public', 'active'],
                },
            ];

            vi.spyOn(WebsiteService, 'findPublicAndActiveWebsites').mockResolvedValue(mockWebsites);

            const response = await request(app).get('/websites/public/all');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Websites fetched successfully',
                payload: mockWebsites.map((site) => ({
                    ...site,
                    createdAt: site.createdAt.toISOString(),
                    updatedAt: site.updatedAt.toISOString(),
                })),
            });
        });

        it('should return 200 with empty array if no public and active websites found', async () => {
            vi.spyOn(WebsiteService, 'findPublicAndActiveWebsites').mockResolvedValue([]);

            const response = await request(app).get('/websites/public/all');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Websites fetched successfully',
                payload: [],
            });
        });

        it('should return 500 if an error occurs', async () => {
            vi.spyOn(WebsiteService, 'findPublicAndActiveWebsites').mockRejectedValue(
                new Error('Database error'),
            );

            const response = await request(app).get('/websites/public/all');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                status: 'error',
                message: 'An unexpected error occurred. On Route /websites/public/all',
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });

    describe('GET /websites/keywords', () => {
        it('should return all keywords', async () => {
            const mockKeywords = ['keyword1', 'keyword2'];

            vi.spyOn(WebsiteService, 'findAllKeywords').mockResolvedValue(mockKeywords);

            const response = await request(app).get('/websites/keywords/all');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Keywords fetched successfully',
                payload: mockKeywords,
            });
        });

        it('should return 500 if an error occurs', async () => {
            vi.spyOn(WebsiteService, 'findAllKeywords').mockRejectedValue(
                new Error('Database error'),
            );

            const response = await request(app).get('/websites/keywords/all');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                status: 'error',
                message: 'An unexpected error occurred. On Route /websites/keywords/all',
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });
});
