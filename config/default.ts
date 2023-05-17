import { config } from "dotenv"
config()

export default {
    port: 4040,
    dbURI: process.env.DB_URI,
    HASHSALT: 10,
    accessTokenKey: process.env.ACCESS_TOKEN_SECRETS,
    refreshTokenKey: process.env.REFRESH_TOKEN_SECRET
}