import { Request, Response } from "express";


export function User (req: Request, res: Response) { 
    return res.json({ message: `Welcome John Doe` })
}
