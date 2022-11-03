
import { Schema, model } from "mongoose"

// const Users: IUser[] | null = []

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

const userModel = model("User", userSchema);


export default userModel