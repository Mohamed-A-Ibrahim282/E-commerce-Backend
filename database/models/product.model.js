import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 30,
      maxLength: 2000,
    },
    imageCover: String,
    images: [String],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: Number,
    stock: {
      type: Number,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: Types.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
  },
  { timestamps: true, versionKey: false, toJSON: { virtuals: true }, id: false } // y4eel id elwahme
);

schema.post("init", function (doc) {
  if (doc.imageCover)
    doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover;
  if (doc.images)
    doc.images = doc.images.map(
      (img) => process.env.BASE_URL + "products/" + img
    );
});

//key wahme
schema.virtual("myReviews", {
  ref: "Review",
  localField: "_id", // id bta3 el product
  foreignField: "product", // foriegn key beta3 el product fe el model bta3 El Review n4ofoh msamyenoh eh w n7toh hna
});

schema.pre("findOne", function () {
  this.populate("myReviews");
});

export const Product = model("Product", schema);
