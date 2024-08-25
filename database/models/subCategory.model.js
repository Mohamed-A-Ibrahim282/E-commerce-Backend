import { Schema, model } from "mongoose";

const subcategorySchema = new Schema(
  {
    name: { type: String, unique: true, require: true },
    slug: String,
    category: { type: Schema.Types.ObjectId, ref: "Category", require: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

export const Subcategory = model("Subcategory", subcategorySchema);
