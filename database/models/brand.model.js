import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, unique: true },
    slug: String,
    logo: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
    timestamps: { updatedAt: false },
  }
);

schema.post("init", function (doc) {
  if (doc.logo) {
    doc.logo = `${process.env.BASE_URL}brands/${doc.logo}`;
  }
});

export const Brand = model("Brand", schema);
