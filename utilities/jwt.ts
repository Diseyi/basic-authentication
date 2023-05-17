import jwt from "jsonwebtoken";
import config from 'config';

 export function generateToken(id: string, email: string)  {

    const ACCESSTOKEN = config.get<string>('accessTokenKey');
    const REFRESHTOKEN = config.get<string>('refreshTokenKey');
    const user = { id, email }

    const refreshToken = jwt.sign(user, REFRESHTOKEN, { expiresIn: "10d" });
    const accessToken = jwt.sign(user, ACCESSTOKEN, { expiresIn: "10m" });

    return { accessToken, refreshToken }
  }
