import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import authConfig from '../config/auth';
import db from '../database/connection';

export default class SessionsController {
  async create(request: Request, response: Response) {
    const { password, email } = request.body;

    try {
      const user = await db('users').where('email', email).first();

      if (!user) {
        throw new Error('Incorrect email/password combination');
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new Error('Incorrect email/password combination');
      }

      delete user.password;

      const token = sign({ userId: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ message: 'Error on sessions' });
    }
  }
}
