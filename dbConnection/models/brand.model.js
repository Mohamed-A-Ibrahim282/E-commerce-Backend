import { Schema, Types, model } from "mongoose"

const brandSchema = new Schema(
    {
        name: { type: String, trim: true, unique: [true, "name must be unique"], required: [true, "name is require"], minLength: [2, "too short brand name"] },
        slug: { type: String, lowercase: true, required: true },
        logo: String,
        createdBy: { type: Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

brandSchema.post('find', function (docs) {
    docs.forEach(val => {
        val.userResume = "http://localhost:3000/" + val.userResume
    });
})

export const Brand = model('Brand', brandSchema)
