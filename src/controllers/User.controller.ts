import { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import jwt from 'jsonwebtoken';

export class UserController {
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password } = req.body;
      const identifier = email || username;

      if (!identifier || !password) {
        res.status(400).json({ message: 'Email or username and password are required.' });
        return;
      }

      const user = await UserService.login(identifier, password);

      if (!user) {
        res.status(401).json({ message: 'Invalid login credentials.' });
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

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password } = req.body;

      if (!email || !username || !password) {
        res.status(400).json({ message: 'Email, username, and password are required.' });
        return;
      }

      const user = await UserService.register(email, username, password);

      res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        res.status(409).json({ message: error.message });
      } else {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
