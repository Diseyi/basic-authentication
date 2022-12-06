
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
const { v4: uuid } = require('uuid');
import * as bcrypt from 'bcrypt';
import Users from "../../models/useModel";
import { createToken } from "../../utilities/jwt";


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

    const user = await Users.findOne({ email }).populate("password");
    if (user) {
        return res.status(400).json(
            {
                status: "failed",
                message: "User already exist! ",
            }
        );
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const createdAt = new Date();
        const user = await req.body;
        user.id = uuid();
        user.createdAt = createdAt;
        user.password = hash
        user.token = createToken(user.id)

        await Users.create(user);
        res.status(200)
        res.send({
            status: "success",
            message: "user succesfully signed in",
            data: {
                id: user.id,
                email: user.email,
                token: user.token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }

        })
    } catch (error) {
        res.status(500).json({ error });
    }
}