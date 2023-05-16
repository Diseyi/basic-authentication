
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import { UserService } from "../services/user.services";
import { Session } from "./session.controller";
import { SessionService } from "../services/session.services";


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
            const data = await UserService.createUser({ password, email })
            const userData = UserService.createSuccessResponse(data, "User successfully created!")
            return res.status(200).send(userData)
        } catch (error) {
            return res.status(400).send({ error: "Login failed" });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(422).json({ errors: errorMessages });
        }

        try {

            const user = await UserService.findUser({ email })
            if (!user || !user.password) {
                return res.status(400).json(errorJson);
            }

            const match = await UserService.validateUser(password, user.password);

            if (!match) {
                return res.status(400).json(errorJson);
            }
            const data = await UserService.authenticateUser(user);
            const userData = await UserService.createSuccessResponse(data, "User login successful!");
            const finduser = await SessionService.findSession({userId: data.id})
            if (!finduser)  await Session.createSessionHandler(req, data.id, data.refreshToken);
            return res.status(200).send(userData)
        } catch (error) {
            return res.status(400).send({ error: "Login failed" });
        }
    }
} 