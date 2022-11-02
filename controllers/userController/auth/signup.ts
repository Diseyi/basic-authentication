
import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
const { v4: uuid } = require('uuid');
import Users from "../../../models/useModel";


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

    const user = Users!.find(user => user.email === email);
    if (user) {
        return res.status(400).json(
            {
                status: "failed",
                message: "User already exist! ",
            }
        );
    }

    try {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const user = await req.body;
        user.id = uuid();
        user.date = date;
        user.time = time;

        Users!.push(user);
        res.status(200)
        res.send({
            status: "success",
            message: "user succesfully signed in",
            data: user

        })
    } catch (error) {
        res.status(500).json({ error: "Signup failed failed" });
    }
}