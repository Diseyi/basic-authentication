import { JWT } from './../utilities/jwt';
import { Request, Response } from "express";
import { SessionService } from "../services/session.services";

export class Session {

    static async createSessionHandler(req: Request, id: string, refreshToken: string) {
        try {
            const userAgent = req.get("user-agent") || ""
            const _session = await SessionService.createSession(id, userAgent, refreshToken)
        } catch (error) {
            console.log(error);
        }
    }

    static async generateNewToken(req: Request, res: Response) {
        const refreshToken = req.body.token
        if (!refreshToken) return res.status(401).send('No token')
        const session = await SessionService.findSession({ refreshToken })

        try {
            if (!session) {
                throw Error("Error");
            }
            const REFRESHTOKEN = process.env.REFRESH_TOKEN_SECRETS
            const valid = await SessionService.validateToken(refreshToken, `${REFRESHTOKEN}`)
            if (!valid) {
                throw Error("Error")
            }
            const { id, email } = valid
            const token = JWT.generateToken(id, email)
            await SessionService.updateSession({ userId: id }, { refreshToken: token.refreshToken })
            return res.status(200).json(token)
        } catch (error) {
            return res.status(403).send({ error: "Invalid Token" })
        }
    }

    static async deleteToken(req: Request, res: Response) {
        try {
            const userId = req.body.id;
            if (!userId) throw Error("Error")
            await SessionService.updateSession({ userId }, { refreshToken: null })
            return res.status(200).send("Successsful")
        } catch (error) {
            return res.status(403).send({ error: "Invalid user id" })
        }
    }
}

