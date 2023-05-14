
import { Schema, model } from "mongoose";
import * as bcrypt from 'bcrypt';

export interface IUser {
    id: string
    password: string;
    email: string;
}

export interface UserDocument extends IUser {
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

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
        methods: {
            comparePassword(userPassword: string) {
                let user = this;
                if (user.password)
                    return bcrypt.compare(userPassword, user.password).catch((e) => false);
            }
        }
    }
);

userSchema.pre("save", async function (next) {
    let user = this;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10)
    if (user.password) {
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    return next()

})

const UserModel = model("Auth", userSchema);
export default UserModel