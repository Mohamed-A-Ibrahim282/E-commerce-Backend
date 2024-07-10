import { Schema, model } from "mongoose"

const categorySchema = new Schema(
    {
        name: { type: String, unique: true, require: true },
        slug: String,
        image: String,
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Category = model('Category', categorySchema)
