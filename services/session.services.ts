import { FilterQuery, UpdateQuery } from "mongoose";
import jwt from "jsonwebtoken";
import SessionModel, { SessionDocument } from "../models/session.model";



export class SessionService {
    static async createSession(userId: string, userAgent: string, refreshToken: string) {
        const lastLogin = new Date().toISOString();
        const session = await SessionModel.create({userId, lastLogin, userAgent, refreshToken});
        return session.toJSON();
      }    
      
      static async updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
        return SessionModel.updateOne(query, update)
      }

      static async findSession(query: FilterQuery<SessionDocument>) {
        return await SessionModel.findOne(query).lean()
    }

      static async validateToken(usertoken: string, TOKEN: string ) {
        let value;
        await jwt.verify(usertoken , `${TOKEN}`, (err: any, user: any) => {
            if (err) {
                value = false
            }
            value = user
        })
        return value
    }
}