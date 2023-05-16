import { Schema, model } from "mongoose";

export interface SessionDocument {
    userId: string
    lastLogin: string;
    refreshToken: string | null
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: true
        },
        lastLogin: {
            type: String,
            required: true
        },
        userAgent: { type: String },
        refreshToken: {
            type: String,
            set: function (value: string) {
                if (!value) {
                    return null;
                }
                return value;
            },
        },
    }, { timestamps: true, }
)

const sessionModel = model<SessionDocument>("Session", sessionSchema)
export default sessionModel