import { Schema, model } from "mongoose"

const brandSchema = new Schema(
    {
        name: { type: String, unique: true },
        slug: String,
        logo: String,
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Brand = model('Brand', brandSchema)
