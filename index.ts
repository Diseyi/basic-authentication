
import express, { Application, Request, Response } from "express";
import userRouter from "./routes/userRoutes";

const app: Application = express()
const PORT = 4040

app.use(express.json())

app.use("/api/v1/users", userRouter)


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})