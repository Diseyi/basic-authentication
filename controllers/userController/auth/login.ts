
import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
const { v4: uuid } = require('uuid');
import Users from "../../../models/useModel";

const errorJson =  {
    status: "failed",
    message: "Invalid email or password ",
}


export const Login = async (req: Request, res: Response) => {
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

    if (!user) {
        return res.status(400).json(errorJson);
    }

    if (password !== user.password) {
        return res.status(400).json(errorJson);
    }

    try {
        res.status(200)
        res.send({
            status: "success",
            message: "user succesfully signed in",
            data: user

        })
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }


}