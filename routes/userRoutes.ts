import express from "express";
import { User} from "../controllers/user.controller";
import { authenticateToken} from "../utilities/jwt";
import { signupSchema } from "../schema/user.schema";
import { Auth } from "../controllers/auth.controller";

const router = express.Router()

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Login Time: ', Date.now())
//     next()
// })

router
.post("/login", signupSchema, Auth.login)
.post("/signup", signupSchema, Auth.signup)
.get("/users", authenticateToken, User)
.post("/token", Auth.generateNewToken)
.post("/logout", Auth.deleteToken)

export default router