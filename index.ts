
import express, { json, Application } from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes";
import { connect } from './config/database';

config();

const app: Application = express()
const PORT = process.env.PORT

app.use(json())
app.use("/api/auth", userRouter)
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    connect()
})