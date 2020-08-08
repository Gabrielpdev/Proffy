import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  userId: string;
}

export default function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { userId } = decoded as ITokenPayload;

    req.user = {
      id: userId,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
}
