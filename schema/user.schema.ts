import { checkSchema } from "express-validator";

export const signupSchema = checkSchema({
    email: {
        in: ['body'],
        isEmail: {
            bail: true,
            errorMessage: 'Email is required and must be a valid e-mail address',
        },
        errorMessage: 'Invalid Email address',
    },
    password: {
        in: ['body'],
        isEmpty: { 
            negated: true,
            bail: true,
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars',
        },
        errorMessage: 'Password is required and should be at least 8 chars',
    },
});
