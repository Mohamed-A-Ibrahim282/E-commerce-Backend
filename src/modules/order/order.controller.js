import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { Order } from "../../../database/models/order.model.js";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1-Add Cart to user
const createCashOrder = catchError(async (req, res, next) => {
  // get user cart by cartId
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));
  // total order price
  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
  // create order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  await order.save();

  // increment sold & decrement stock to product
  let options = cart.cartItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product.product },
        update: { $inc: { sold: product.quantity, stock: -product.quantity } },
      },
    };
  });
  await Product.bulkWrite(options);
  // clear user cart
  await Cart.findByIdAndDelete(cart._id);

  res.json({ message: "Success", order });
});
// merge param
const getUserOrder = catchError(async (req, res, next) => {
  let orders = await Order.findOne({ user: req.user._id }).populate(
    "orderItems.product"
  );
  res.json({ message: "Success", orders });
});

// get all orders ==> admin
const getOrders = catchError(async (req, res, next) => {
  let orders = await Order.find();
  res.json({ message: "Success", orders });
});

// payments
const createCheckOutSession = catchError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));
  let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;

  let session = stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://hambozo.netlify.app/#/orders", // lma ydf3 hyroo7 feen
    cancel_url: "https://hambozo.netlify.app/#/cart", // lma ycancel el order aw yerg3 yroo7 feen

    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });

  res.json({ message: "Success", session });
});
export { createCashOrder, getOrders, getUserOrder, createCheckOutSession };
