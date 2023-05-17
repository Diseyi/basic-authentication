import mongoose from "mongoose"
import config from 'config';
import log from "../utilities/logger";

export const connect = async () => {
    try {
        const dbUri: any = config.get<string>("dbURI")
        await mongoose.connect(dbUri)
        log.info("Connected to mongo")
    } catch (error) {
        log.error(error);
    }
};