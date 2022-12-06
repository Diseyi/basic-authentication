
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';
import Users from "../../models/useModel";
import { createToken } from "../../utilities/jwt";

const errorJson = {
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

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json(errorJson);
    }

    try {
        res.status(200)
        res.send({
            status: "success",
            message: "user succesfully signed in",
            data: {
                id: user.id,
                email: user.email,
                token: createToken(user.id),
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }

        })
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}