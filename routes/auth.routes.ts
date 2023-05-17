import express from "express";
import { User} from "../controllers/user.controller";
import { authenticateToken} from "../middlewares/authenticateToken";
import { signupSchema } from "../schema/user.schema";
import { Auth } from "../controllers/auth.controller";
import { Session } from "../controllers/session.controller";

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
.patch("/token", Session.generateNewToken)
.patch("/token/:id", Session.deleteToken)

export default router