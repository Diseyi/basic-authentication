import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  }
}

export class JWT {
  static generateToken(id: string, email: string){
    const user = { id, email }
  
    const ACCESSTOKEN = process.env.ACCESS_TOKEN_SECRETS
    const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS
  
    const refreshToken = jwt.sign(user, `${REFRESHTOKEN}`, { expiresIn: "10d" });
    const accessToken = jwt.sign(user, `${ACCESSTOKEN}`, { expiresIn: "10d" });
  
    return {accessToken, refreshToken}
  }
}


export const accessToken = (id: string, email: string) => {
  const user = { id, email }
  const ACCESSTOKEN = process.env.ACCESS_TOKEN_SECRETS

  return jwt.sign(user, `${ACCESSTOKEN}`, { expiresIn: "30s" });
};

export const refreshToken = (id: string, email: string) => {
  const user = { id, email }
  const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS

  return jwt.sign(user, `${REFRESHTOKEN}`);
};

export const generateToken = (id: string, email: string) => {
  const user = { id, email }

  const ACCESSTOKEN = process.env.ACCESS_TOKEN_SECRETS
  const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS

  const refreshToken = jwt.sign(user, `${REFRESHTOKEN}`, { expiresIn: "10d" });
  const accessToken = jwt.sign(user, `${ACCESSTOKEN}`, { expiresIn: "10d" });

  return {accessToken, refreshToken}
};

export const verifyToken = (token: string, configToken: string) => {
  jwt.verify(token, `${configToken}`, (err: any, user: any) => {
    if (err) {
      return err
    }
  })
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
