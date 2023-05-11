import { FilterQuery } from "mongoose";
import * as bcrypt from 'bcrypt';
import Users from "../models/useModel";

export async function findUser(query: FilterQuery<{ id: string; email: string; password: string; }>) {
    return await Users.findOne(query).lean()
}

export async function validateUser(password: string, comparePassword: string) {
    return await bcrypt.compare(password, comparePassword)
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}