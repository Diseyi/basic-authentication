import { FilterQuery } from "mongoose";
import * as bcrypt from 'bcrypt';
const { v4: uuid } = require('uuid');
import { omit } from "lodash";
import Users from "../models/user.model";
import { generateToken } from "../utilities/jwt";

export class UserService {
    static async createUser({ password, email }: { password: string, email: string }) {
        const fields = {
            id: uuid(),
            email,
            password,
        }
        const user = await Users.create(fields);
        return omit(user.toJSON(), "password", "_id", "__v");
    }

    static async authenticateUser(user: { id: string, email: string }) {
        const { id, email } = user
        const token = generateToken(id, email)
        return {...omit(user, "password", "_id", "__v"), ...token}
    }

    static async findUser(query: FilterQuery<{ id: string; email: string; password: string; }>) {
        return await Users.findOne(query).lean()
    }

    static async validateUser(password: string, comparePassword: string) {
        return await bcrypt.compare(password, comparePassword)
    }

    static createSuccessResponse(data: any, text: string) {
        return {
            status: "success",
            message: text,
            data: data,
        };
    }
}