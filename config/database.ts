import mongoose from "mongoose"
import * as dotenv from "dotenv";

dotenv.config();

const mongo: any = process.env.MONGO_URL


export const connect = async () => {
    console.log("trying to connect to mongo")
    try {
       await mongoose.connect(mongo)
        console.log("Connected to mongo")
    } catch (error) {
        console.log(error);
    }

};

