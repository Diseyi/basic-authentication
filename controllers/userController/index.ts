import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../../middlewares/authenticateToken";
import { Login } from "./login";
import { Signup } from "./signup";
import { deleteToken, refreshTokenArray } from "../..";
import { accessToken } from "../../utilities/jwt";

function User (req: Request, res: Response) {
    const user = req.body    
    return res.json({ message: `Welcome John Doe` })
}

function DeleteToken (req: Request, res: Response) {
    const token = req.body.token
    deleteToken(token)    
    return res.status(200).send("Successsful")
}

function RefreshToken (req: Request, res: Response) {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).send('No token')

    if (!refreshTokenArray.includes(refreshToken)) {
        return res.status(403).send('Invalid token')
    }
    const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS
    jwt.verify(refreshToken, `${REFRESHTOKEN}`, (err: any, user: any) => {
        if (err) return res.status(403).send('Error')

        const accesstoken = accessToken(user.id, user.email);
        return res.status(200).json({ accesstoken })
    })
}

export {
    Login,
    Signup,
    User,
    DeleteToken,
    RefreshToken
}