import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '@/services/User.service';
import { prisma } from '@/utils/Prisma';
import bcrypt from 'bcrypt';

// 🧪 mock
vi.mock('@/utils/Prisma', () => ({
    prisma: {
        user: {
            findFirst: vi.fn(),
            create: vi.fn(),
        },
    },
}));

// 🔐 mock bycrypt
vi.mock('bcrypt', () => ({
    default: {
        compare: vi.fn(),
        hash: vi.fn(),
    },
}));

const mockedBcrypt = bcrypt as unknown as {
    compare: import('vitest').Mock;
    hash: import('vitest').Mock;
};

describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('login()', () => {
        it('should return user if credentials are valid', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                username: 'testuser',
                password: 'hashed-password',
            };

            (prisma.user.findFirst as any).mockResolvedValue(mockUser);
            mockedBcrypt.compare.mockResolvedValue(true);

            const result = await UserService.login('testuser', 'correct-password');

            expect(prisma.user.findFirst).toHaveBeenCalledWith({
                where: {
                    OR: [{ email: 'testuser' }, { username: 'testuser' }],
                },
            });

            expect(mockedBcrypt.compare).toHaveBeenCalledWith(
                'correct-password',
                mockUser.password,
            );
            expect(result).toEqual(mockUser);
        });

        it('should return null if user not found', async () => {
            (prisma.user.findFirst as any).mockResolvedValue(null);

            const result = await UserService.login('nonexistent', 'any');
            expect(result).toBeNull();
        });

        it('should return null if password is invalid', async () => {
            const mockUser = {
                id: 2,
                email: 'test@example.com',
                username: 'testuser',
                password: 'hashed-password',
            };

            (prisma.user.findFirst as any).mockResolvedValue(mockUser);
            mockedBcrypt.compare.mockResolvedValue(false);

            const result = await UserService.login('testuser', 'wrong-password');
            expect(result).toBeNull();
        });
    });

    describe('register()', () => {
        it('should throw if email or username already exists', async () => {
            const existingUser = { id: 1, email: 'exists@example.com', username: 'exists' };
            (prisma.user.findFirst as any).mockResolvedValue(existingUser);

            await expect(
                UserService.register('exists@example.com', 'exists', 'password123'),
            ).rejects.toThrow('User with given email or username already exists.');
        });

        it('should create user if not existing', async () => {
            (prisma.user.findFirst as any).mockResolvedValue(null);
            mockedBcrypt.hash.mockResolvedValue('hashed-password');

            const createdUser = {
                id: 3,
                email: 'new@example.com',
                username: 'newuser',
                password: 'hashed-password',
            };

            (prisma.user.create as any).mockResolvedValue(createdUser);

            const result = await UserService.register('new@example.com', 'newuser', 'password123');

            expect(mockedBcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(prisma.user.create).toHaveBeenCalledWith({
                data: {
                    email: 'new@example.com',
                    username: 'newuser',
                    password: 'hashed-password',
                },
            });
            expect(result).toEqual(createdUser);
        });
    });
});
