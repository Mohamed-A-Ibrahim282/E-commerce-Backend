import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        name: String,
        email: { type: String, trim: true, unique: true, required: true },
        password: String,
        role: { type: String, enum: ['user', 'admin'], default: "user", lowercase: true },
        status: { type: String, enum: ['online', 'offline'], default: "offline", lowercase: true },
        isBlocked: { type: Boolean, default: false },
        otp: String,
        otpExpires: Date,
        otpVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const User = model('User', userSchema)
