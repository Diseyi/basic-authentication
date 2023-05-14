import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const validate = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(422).json({ errors: errorMessages });
    }
    return;
}