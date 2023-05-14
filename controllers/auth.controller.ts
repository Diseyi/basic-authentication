
import { Request, Response } from "express";
import { validationResult} from 'express-validator';
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.services";
import { getTokenArray, removeToken } from "..";
import { accessToken } from "../utilities/jwt";
import { validate } from "../middlewares/validate";

const errorJson = {
    status: "failed",
    message: "Invalid email or password ",
}

export class Auth {

    static async signup(req: Request, res: Response) {
        const { email, password } = req.body
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(422).json({ errors: errorMessages });
        }

        const user = await UserService.findUser({ email })
        if (user) {
            return res.status(400).json(
                {
                    status: "failed",
                    message: "User already exist! ",
                }
            );
        }
        try {
            const data = await UserService.createUser({password, email})
            const userData = UserService.createSuccessResponse(data, "User successfully created!")
            return res.status(200).send(userData)
        } catch (error) {
            return res.status(400).send({ error: "Login failed" });
        }
    }

    static async login (req: Request, res: Response) {
        const { email, password } = req.body

        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
                return res.status(422).json({ errors: errorMessages });
        }
    
        const user = await UserService.findUser({email})
    
        if (!user || !user.password) {
            return res.status(400).json(errorJson);
        }
    
        const match = await UserService.validateUser(password, user.password);
    
        if (!match) {
            return res.status(400).json(errorJson);
        }
    
        try {
            const data = await UserService.authenticateUser(user)
            const userData = UserService.createSuccessResponse(data, "User login successful!")
            return res.status(200).send(userData)
        } catch (error) {
            return res.status(400).send({ error: "Login failed" });
        }
    }

    static generateNewToken (req: Request, res: Response) {
        const refreshToken = req.body.token
        if (!refreshToken) return res.status(401).send('No token')
    
        if (!getTokenArray().includes(refreshToken)) {
            return res.status(403).send('Invalid token')
        }
        const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS
        jwt.verify(refreshToken, `${REFRESHTOKEN}`, (err: any, user: any) => {
            if (err) return res.status(403).send('Error')
    
            const accesstoken = accessToken(user.id, user.email);
            return res.status(200).json({ accesstoken })
        })
    }

    static deleteToken (req: Request, res: Response) {
        const token = req.body.token
        removeToken(token)    
        return res.status(200).send("Successsful")
    }
} 