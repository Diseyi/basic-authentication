import express from "express";
import { User, Login, Signup, DeleteToken, RefreshToken } from "../controllers/userController";
import { authenticateToken} from "../utilities/jwt";

const router = express.Router()

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Login Time: ', Date.now())
//     next()
// })

router
.post("/login", Login)
.post("/signup", Signup)
.get("/users", authenticateToken, User)
.post("/token", RefreshToken)
.post("/logout", DeleteToken)

export default router