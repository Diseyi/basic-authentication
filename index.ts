
import express, { Application} from "express";
import * as dotenv from "dotenv";
import userRouter from "./routes/userRoutes";

dotenv.config();

const app: Application = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/v1/users", userRouter)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})