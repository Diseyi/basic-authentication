
import express, {json, Application} from "express";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import { connect } from './config/database';

dotenv.config();
connect()

const app: Application = express()
const PORT = process.env.PORT

app.use(json())

app.use("/api/v1/users", userRouter)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})