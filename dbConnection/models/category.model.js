import { Schema, Types, model } from "mongoose"

const categorySchema = new Schema(
    {
        name: { type: String,trim: true, unique: [true, "name must be unique"], required: [true, "name is require"],minLength: [2, "too short category name"]  },
        slug: { type: String, lowercase: true, required: true },
        image: String,
        createdBy: { type: Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Category = model('Category', categorySchema)
