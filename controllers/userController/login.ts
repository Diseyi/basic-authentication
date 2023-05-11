
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import {omit} from "lodash";
import { createToken } from "../../utilities/jwt";
import { findUser, validateUser } from "../../services/user.services";

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

    const user = await findUser({email})

    if (!user || !user.password) {
        return res.status(400).json(errorJson);
    }

    const match = await validateUser(password, user.password);

    if (!match) {
        return res.status(400).json(errorJson);
    }

    try {
        const token = createToken(user.id, user.email);
        const data = {...omit(user, "password", "_id", "__v"), token}
        res.status(200).send({
            status: "success",
            message: "user succesfully signed in",
            data: data
        })
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
}