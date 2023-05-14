
import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
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
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = model("Auth", userSchema);


export default UserModel