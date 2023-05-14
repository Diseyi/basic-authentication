import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    user: {
      id: string;
      email: string;
    }
  }

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
        return res.status(401).json({ error: 'You are not authorized' })
    }

    const token = authorization.split(' ')[1]
    const ACCESSTOKEN = process.env.ACCESS_TOKEN_SECRETS

    jwt.verify(token, `${ACCESSTOKEN}`, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: err });
        }

        return next()
    });
}
