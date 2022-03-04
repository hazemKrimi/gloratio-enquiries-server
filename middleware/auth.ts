// Packages
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['authorization']) throw new Error('Not authorized');
    else {
      const user = verify(
        req.headers['authorization'].split(' ')[1],
        process.env.JWT_SECRET as string
      );
      if (!user) throw new Error('Not authorized');
      else {
        // @ts-ignore
        req.user = { id: user.id, role: user.role } as {
          id: string;
          role: 'user' | 'customer' | 'admin';
        };
        next();
      }
    }
  } catch {
    next();
  }
};
