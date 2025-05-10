import { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import jwt from 'jsonwebtoken';
import { ApiResponseBuilder } from '../models/ApiResponseBuilder';
import { ErrorCode } from '../types/CustomError.types';

export class UserController {
    public static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, username, password } = req.body;
            const identifier = email || username;

            if (!identifier || !password) {
                res.status(400).json(
                    ApiResponseBuilder.error(
                        'Email/Username and password are required.',
                        ErrorCode.EMAIL_USERNAME_AND_PASSWORD_REQUIRED,
                    ),
                );
                return;
            }

            const user = await UserService.login(identifier, password);

            if (!user) {
                res.status(401).json(
                    ApiResponseBuilder.error('Invalid credentials', ErrorCode.INVALID_CREDENTIALS),
                );
                return;
            }

            if (!process.env.JWT_SECRET) {
                console.error('JWT_SECRET is missing in environment');
                res.status(500).json({ message: 'JWT configuration error' });
                return;
            }

            // 🔐 Token im Controller erzeugen
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Set to true in production
                maxAge: 3600000, // 1 hour
            })
                .status(200)
                .json(
                    ApiResponseBuilder.success('Login succesful', {
                        user: {
                            id: user.id,
                            email: user.email,
                            username: user.username,
                        },
                    }),
                ); // Send the token in a cookie
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    // TODO add Validator

    public static async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                res.status(400).json(
                    ApiResponseBuilder.error(
                        'Email, username, and password are required.',
                        ErrorCode.REGISTER_ERROR,
                    ),
                );
                return;
            }

            const user = await UserService.register(email, username, password);

            res.status(201).json(
                ApiResponseBuilder.success('User registered successfully', { user }),
            );
        } catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                res.status(409).json(
                    ApiResponseBuilder.error('User already exists', ErrorCode.USER_ALREADY_EXISTS),
                );
            } else {
                console.error('Registration error:', error);
                res.status(500).json(
                    ApiResponseBuilder.error(
                        'Internal server error',
                        ErrorCode.INTERNAL_SERVER_ERROR,
                    ),
                );
            }
        }
    }
}
