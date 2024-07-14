import { Schema, Types, model } from "mongoose"

const couponSchema = new Schema(
    {
        code: { type: String, unique: [true, "code must be unique"], required: true },
        expires:Date,
        discount:Number,
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Coupon = model('Coupon', couponSchema)
