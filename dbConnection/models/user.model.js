import { Schema, model } from "mongoose"

const userSchema = new Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        role: { type: String, enum: ['User', 'Admin'] },
        isBlocked: { type: Boolean, default: false },
        otp: String,
        otpExpires: Date,
        otpVerified: {
            type: Boolean,
            default: false,
        }
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const User = model('User', userSchema)
