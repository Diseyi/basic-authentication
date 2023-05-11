
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
const { v4: uuid } = require('uuid');
import {omit} from "lodash";
import Users from "../../models/useModel";
import { hashPassword, findUser } from "../../services/user.services";


export const Signup = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(
            {
                status: "failed",
                message: "email and password must be included",
                error: {
                    email: "invalid email",
                    password: "invalid password"
                }
            }
        );
    }

    const user = await findUser({email})
    if (user) {
        return res.status(400).json(
            {
                status: "failed",
                message: "User already exist! ",
            }
        );
    }

    try {
        const createdAt = new Date();
        const user = await req.body;
        user.id = uuid();
        user.createdAt = createdAt;
        user.password = await hashPassword(password)
        const data = {...omit(user, "password", "_id", "__v")}

        await Users.create(user);

        res.status(200).send({
            status: "success",
            message: "user succesfully signed in",
            data: data
        })
    } catch (error) {
        res.status(500).json({ error });
    }
}