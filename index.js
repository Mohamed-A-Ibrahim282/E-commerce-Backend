import express from "express";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/middleware/globalError.js";
import { bootstrap } from "./src/bootstrap.js";
import { dbConnection } from "./database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import { catchError } from "./src/middleware/catchError.js";

import Stripe from "stripe";
import { Order } from "./database/models/order.model.js";
import { User } from "./database/models/user.model.js";
import { Cart } from "./database/models/cart.model.js";
import { Product } from "./database/models/product.model.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  catchError(async (req, res, next) => {
    const sig = req.headers["stripe-signature"].toString();

    let event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      "whsec_ZL8b0G0NwJD86SdB52zotki89WUrlQh3"
    );

    let checkout;
    if (event.type == "checkout.session.completed") {
      checkout = event.data.object;

      let user = await User.findOne({ email: checkout.customer_email });
      let cart = await Cart.findById(checkout.client_reference_id);
      if (!cart) return next(new AppError("cart not found", 404));

      let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: checkout.metadata,
        totalOrderPrice: checkout.amount_total / 100,
        paymentType: "card",
        isPaid: true,
      });
      await order.save();

      // increment sold & decrement stock to product
      let options = cart.cartItems.map((product) => {
        return {
          updateOne: {
            filter: { _id: product.product },
            update: {
              $inc: { sold: product.quantity, stock: -product.quantity },
            },
          },
        };
      });
      await Product.bulkWrite(options);
      // clear user cart
      await Cart.findByIdAndDelete(cart._id);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.json({ message: "Success", checkout });
  })
);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

bootstrap(app);

app.use("*", (req, res, next) => {
  next(new AppError(`route not found ${req.originalUrl}`, 404));
});

app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.error(err);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`server is running.`));
