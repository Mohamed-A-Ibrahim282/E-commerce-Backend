import { Schema, Types, model } from "mongoose"

const reviewSchema = new Schema(
    {
        comment: { type: String, required: true },
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        user: { type: Types.ObjectId, ref: 'User', required: true },
        rate: { type: Number, min: 0, max: 5, required: true }
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Review = model('Review', reviewSchema)
