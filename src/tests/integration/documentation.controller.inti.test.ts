import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '@/testApp'; // Deine Express-Test-Instanz
import { DocumentationService } from '@/services/Documentation.service';

vi.mock('@/services/Documentation.service');

describe('DocumentationController Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('GET /documentation/all', () => {
        it('should return 200 with documents', async () => {
            const mockData = [
                {
                    id: 1,
                    name: 'Doc 1',
                    description: 'Description',
                    version: '1.0',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator: 'Bastian',
                    filepath: '/docs/1',
                    picturepath: '/pics/1',
                    keywords: ['test'],
                },
            ];

            (DocumentationService.getAllDocumentation as any).mockResolvedValue(mockData);

            const res = await request(app).get('/documentation/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Documents retrieved successfully',
                payload: mockData,
            });
        });

        it('should return 200 with error response if no documents found', async () => {
            (DocumentationService.getAllDocumentation as any).mockResolvedValue([]);

            const res = await request(app).get('/documentation/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'error',
                message: 'No documents found',
                code: 'DOCUMENT_NOT_FOUND',
            });
        });

        it('should return 500 on internal error', async () => {
            (DocumentationService.getAllDocumentation as any).mockRejectedValue(
                new Error('DB error'),
            );

            const res = await request(app).get('/documentation/all');

            expect(res.status).toBe(500);
            expect(res.body).toMatchObject({
                status: 'error',
                message: expect.stringContaining('unexpected error'),
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });

    describe('GET /docs/public', () => {
        it('should return 200 with active and public docs', async () => {
            const mockData = [
                {
                    id: 1,
                    name: 'Public Doc',
                    version: '1.0',
                    description: 'Public Desc',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator: 'PublicUser',
                    filepath: '/docs/public/1',
                    picturepath: '/pics/1',
                    keywords: ['public'],
                },
            ];

            (DocumentationService.getAllActiveAndPublicDocumentation as any).mockResolvedValue(
                mockData,
            );

            const res = await request(app).get('/documentation/public/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Documents retrieved successfully',
                payload: mockData,
            });
        });

        it('should return 500 if service throws error', async () => {
            (DocumentationService.getAllActiveAndPublicDocumentation as any).mockRejectedValue(
                new Error('DB failure'),
            );

            const res = await request(app).get('/documentation/public/all');

            expect(res.status).toBe(500);
            expect(res.body).toMatchObject({
                status: 'error',
                message: expect.stringContaining('unexpected error'),
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });

    describe('GET /documentation/keywords/all', () => {
        it('should return 200 with keywords', async () => {
            const mockKeywords = ['keyword1', 'keyword2'];

            (DocumentationService.getAllKeywordsFromDocumentation as any).mockResolvedValue(
                mockKeywords,
            );

            const res = await request(app).get('/documentation/keywords/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Documents retrieved successfully',
                payload: mockKeywords,
            });
        });

        it('should return 500 on error', async () => {
            (DocumentationService.getAllKeywordsFromDocumentation as any).mockRejectedValue(
                new Error('DB error'),
            );

            const res = await request(app).get('/documentation/keywords/all');

            expect(res.status).toBe(500);
            expect(res.body).toMatchObject({
                status: 'error',
                message: expect.stringContaining('unexpected error'),
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
        it('should return 200 with empty array if no keywords found', async () => {
            (DocumentationService.getAllKeywordsFromDocumentation as any).mockResolvedValue([]);

            const res = await request(app).get('/documentation/keywords/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Documents retrieved successfully',
                payload: [],
            });
        });
    });
});
