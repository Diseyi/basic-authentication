import { generateToken } from './../utilities/jwt';
import { Request, Response } from "express";
import config from 'config';
import { SessionService } from "../services/session.services";
import log from '../utilities/logger';

export class Session {

    static async createSessionHandler(req: Request, id: string, refreshToken: string) {
        try {
            const userAgent = req.get("user-agent") || ""
            const _session = await SessionService.createSession(id, userAgent, refreshToken)
        } catch (error) {
            log.error(error);
        }
    }

    static async generateNewToken(req: Request, res: Response) {
        const refreshToken = req.body.token
        if (!refreshToken) return res.status(401).send('No token')

        try {
            const session = await SessionService.findSession({ refreshToken })
            if (!session) throw Error("Error");

            const REFRESHTOKEN = config.get<string>('refreshTokenKey');
            const valid = await SessionService.validateToken(refreshToken, `${REFRESHTOKEN}`)
            if (!valid) throw Error("Error")

            const { id, email } = valid
            const token = generateToken(id, email)
            const me = await SessionService.updateSession({ userId: id }, { refreshToken: token.refreshToken })
            return res.status(200).json(token)
        } catch (error) {
            log.error(error);
            return res.status(403).send({ error: "Invalid Token" })
        }
    }

    static async deleteToken(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            if (!userId) throw Error("Error")
            await SessionService.updateSession({ userId }, { refreshToken: null })
            return res.status(200).send({message: "Successsful"})
        } catch (error) {
            log.error(error);
            return res.status(403).send({ error: "Invalid user id" })
        }
    }
}

