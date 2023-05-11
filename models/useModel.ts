
import { Schema, model } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
        default: null
    },
});

const userModel = model("Auth", userSchema);


export default userModel