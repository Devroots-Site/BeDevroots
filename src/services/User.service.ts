import { prisma } from '../utils/Prisma';
import bcrypt from 'bcrypt';

export class UserService {
    public static async login(emailOrUsername: string, password: string) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        return isPasswordValid ? user : null;
    }

    public static async register(email: string, username: string, password: string) {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            throw new Error('User with given email or username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        return user;
    }
}
