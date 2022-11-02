import express from "express";
import { body } from 'express-validator';
import { Login } from "../controllers/userController/auth/login";
import { Signup } from "../controllers/userController/auth/signup";

const router = express.Router()

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Login Time: ', Date.now())
//     next()
// })

router.post("/login",
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    Login)

router.post("/signup", Signup)

export default router