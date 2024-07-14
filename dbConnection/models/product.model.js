import { Schema, Types, model } from "mongoose"

const productSchema = new Schema(
    {
        title: { type: String, trim: true, unique: [true, "title must be unique"], required: [true, "title is require"], minLength: [2, "too short product name"] },
        slug: { type: String, lowercase: true },
        discription: { type: String, trim: true, minLength: [30, "too short product discription"], maxLength: 1000, required: [true, "discription is require"] },
        imageCover: String,
        images: [String],
        price: { type: Number, min: 0, required: [true, "price is require"] },
        priceAfterDiscount: { type: Number, min: 0, required: true },
        sold: Number,
        stock: { type: Number, min: 0 },
        category: { type: Types.ObjectId, ref: 'Category', required: true },
        subcategory: { type: Types.ObjectId, ref: 'Subcategory', required: true },
        brand: { type: Types.ObjectId, ref: 'Brand', required: true },
        rateAvg: { type: Number, min: 0, max: 5 },
        rateCount: Number,
        createdBy: { type: Types.ObjectId, ref: 'User' },
    },
    {
        versionKey: false,
        timestamps: { updatedAt: false }
    }
);

productSchema.post('find', function (docs) {
    docs.forEach(val => {
        val.imageCover = "http://localhost:3000/" + val.imageCover
    });
})

export const Product = model('Product', productSchema)
