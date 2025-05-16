import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '@/testApp'; // Express app instance
import { ToolService } from '@/services/Tools.service';

vi.mock('@/services/Tools.service');

describe('ToolController Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    describe('GET /tools/all', () => {
        it('should return 200 with tools', async () => {
            const mockTools = [
                {
                    id: 1,
                    name: 'Tool A',
                    description: 'A useful tool',
                    version: '1.0',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator: 'ToolMaker',
                    filepath: '/tools/1',
                    picturepath: '/images/tool1',
                    keywords: ['dev', 'utility'],
                },
            ];

            (ToolService.getAllTools as any).mockResolvedValue(mockTools);

            const res = await request(app).get('/tools/all');

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                status: 'success',
                message: 'Tools retrieved successfully',
                payload: mockTools,
            });
        });

        it('should return 404 if no tools found', async () => {
            (ToolService.getAllTools as any).mockResolvedValue([]);

            const res = await request(app).get('/tools/all');

            expect(res.status).toBe(404);
            expect(res.body).toEqual({
                status: 'error',
                message: 'No tools found',
                code: 'TOOLS_NOT_FOUND',
            });
        });

        it('should return 500 on internal error', async () => {
            (ToolService.getAllTools as any).mockRejectedValue(new Error('Unexpected DB error'));

            const res = await request(app).get('/tools/all');

            expect(res.status).toBe(500);
            expect(res.body).toMatchObject({
                status: 'error',
                message: expect.stringContaining('unexpected'),
                code: 'INTERNAL_SERVER_ERROR',
            });
        });
    });
});
