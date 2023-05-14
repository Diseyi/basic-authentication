import { FilterQuery } from "mongoose";
import * as bcrypt from 'bcrypt';
const { v4: uuid } = require('uuid');
import { omit } from "lodash";
import Users from "../models/useModel";
import { accessToken, refreshToken } from "../utilities/jwt";
import { getTokenArray } from "..";

export async function findUser(query: FilterQuery<{ id: string; email: string; password: string; }>) {
    return await Users.findOne(query).lean()
}

export async function validateUser(password: string, comparePassword: string) {
    return await bcrypt.compare(password, comparePassword)
}

export async function createUser({ password, email }: { password: string, email: string }) {
    const fields = {
        id: uuid(),
        email,
        password: await hashPassword(password)
    }
    const user = await Users.create(fields);
    const data = { ...omit(user, "password", "_id", "__v")}    
    return {
        status: "success",
        message: "user succesfully created",
        data: data
    }
}

export async function authenticateUser(user: { id: string, email: string }) {
    const { id, email } = user
    const accesstoken = accessToken(id, email);
    const refreshtoken = refreshToken(id, email);
    getTokenArray().push(refreshtoken)

    const data = { ...omit(user, "password", "_id", "__v"), accesstoken, refreshtoken }
    return {
        status: "success",
        message: "user succesfully signed in",
        data: data
    }
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}