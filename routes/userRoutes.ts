import express from "express";
import { body } from 'express-validator';
import { Login } from "../controllers/userController/login";
import { Signup } from "../controllers/userController/signup";
import { requireAuth } from "../middlewares/requireAuth";

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
router.get("/users",     requireAuth, (req, res) => {
    res.send("hello")
})

export default router