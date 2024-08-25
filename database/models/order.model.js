import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    orderItems: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number },
        price: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: {
      city: String,
      street: String,
      phone: String,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDeliverd: {
      type: Boolean,
      default: false,
    },
    deliverdAt: Date,
  },
  { timestamps: true, versionKey: false }
);

export const Order = model("Order", schema);
