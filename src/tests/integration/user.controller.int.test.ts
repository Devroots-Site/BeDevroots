import request from 'supertest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from '../../testApp';
import { UserService } from '../../services/User.service';

vi.mock('../../src/services/User.service');

describe('UserController Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    describe('POST /auth/login', () => {
        it('should login user and set cookie', async () => {
            const mockUser = {
                id: 123,
                email: 'test@example.com',
                username: 'tester',
                password: 'hashedpassword',
                updated_at: new Date(),
                created_at: new Date(),
                is_active: true,
                is_admin: false,
            };

            vi.spyOn(UserService, 'login').mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: '123456' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Login succesful');
            expect(response.headers['set-cookie']).toBeDefined();
        });

        it('should reject login with missing credentials', async () => {
            const response = await request(app).post('/auth/login').send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Email/Username and password are required.');
        });
        it('should reject login with invalid credentials', async () => {
            vi.spyOn(UserService, 'login').mockResolvedValue(null); // ⛔ no user found
            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'notfound@example.com', password: 'wrongpass' });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Invalid credentials');
            expect(response.body.code).toBe('INVALID_CREDENTIALS'); // ⛔ check error code
            expect(response.body.status).toBe('error'); // ⛔ check error status
        });
    });

    describe('POST /auth/register - integration', () => {
        const validPayload = {
            email: 'example@gmail.com',
            username: 'exampleUser',
            password: 'securePassword123',
        };

        const mockUser = {
            id: 123,
            email: validPayload.email,
            username: validPayload.username,
            password: 'hashedpassword',
            updated_at: new Date(),
            created_at: new Date(),
            is_active: true,
            is_admin: false,
        };

        beforeEach(() => {
            vi.clearAllMocks();
            vi.spyOn(console, 'error').mockImplementation(() => {}); // suppress logs
        });

        it('should register a new user', async () => {
            vi.spyOn(UserService, 'register').mockResolvedValue(mockUser);

            const response = await request(app).post('/auth/register').send(validPayload);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.payload.user).toMatchObject({
                id: 123,
                email: validPayload.email,
                username: validPayload.username,
            });
        });

        it('should return 400 if data is missing', async () => {
            const response = await request(app)
                .post('/auth/register')
                .send({ email: 'test@test.com' }); // username + password fehlen

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Email, username, and password are required.');
            expect(response.body.code).toBe('REGISTER_ERROR');
        });

        it('should return 409 if user already exists', async () => {
            vi.spyOn(UserService, 'register').mockImplementation(() => {
                throw new Error('User already exists');
            });

            const response = await request(app).post('/auth/register').send(validPayload);

            expect(response.status).toBe(409);
            expect(response.body.message).toBe('User already exists');
            expect(response.body.code).toBe('USER_ALREADY_EXISTS');
        });

        it('should return 500 on unknown error', async () => {
            vi.spyOn(UserService, 'register').mockImplementation(() => {
                throw new Error('Database down');
            });

            const response = await request(app).post('/auth/register').send(validPayload);

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Internal server error');
            expect(response.body.code).toBe('INTERNAL_SERVER_ERROR');
        });
    });
});
