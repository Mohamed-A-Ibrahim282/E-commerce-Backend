import { Schema, Types, model } from "mongoose"

const subcategorySchema = new Schema(
    {
        name: { type: String,trim: true, unique: [true, "name must be unique"], required: [true, "name is require"] ,minLength: [2, "too short subcategory name"] },
        slug: { type: String, lowercase: true, required: true },
        category: { type: Types.ObjectId, ref: 'Category', required: true },
        createdBy: { type: Types.ObjectId, ref: 'User'},
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

export const Subcategory = model('Subcategory', subcategorySchema)
