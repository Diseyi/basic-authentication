import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    // or
    // const token = req.headers['authorization'];

    if (!authorization) {
        return res.status(401).json({ error: 'You are not authorized' })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, `${process.env.SECRET}`, (err: any, decoded: any) => {
        if (err) {
            // If the JWT is invalid or has expired, return an error
            return res.status(401).json({ error: err });
        }
        console.log(decoded)
        // If the JWT is valid, use the claims to authorize the user
        if (req.body.id === decoded.id) {
            // If the user is John Doe, grant access to the protected resource
            res.json({ message: 'Welcome, John Doe' });
        } else {
            // If the user is not John Doe, return an error
            res.status(403).json({ error: 'Access denied' });
        }
    });

}
