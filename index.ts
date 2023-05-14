
import express, { json, Application } from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes";
import { connect } from './config/database';

config();

const app: Application = express()
const PORT = process.env.PORT

let refreshTokenArray: any[] = []

export function removeToken(token: string) {
    refreshTokenArray = refreshTokenArray.filter(item => item !== token)
}

export function getTokenArray() {
    return refreshTokenArray
}

app.use(json())
app.use("/api/auth", userRouter)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    connect()
})