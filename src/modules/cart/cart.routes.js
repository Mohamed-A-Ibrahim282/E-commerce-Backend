import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import {
  addToCart,
  applyCoupon,
  clearUserCart,
  getLoggedUserCart,
  removeItemFromCart,
  updateQuantity,
} from "./cart.controller.js";

const cartRouter = Router();

// 1-Add cart
cartRouter.post("/", protectedRoutes, allowedTo("user"), addToCart);
cartRouter.delete("/", protectedRoutes, allowedTo("user"), clearUserCart);
cartRouter.get("/", protectedRoutes, allowedTo("user"), getLoggedUserCart);
cartRouter.put("/:id", protectedRoutes, allowedTo("user"), updateQuantity);
cartRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("user"),
  removeItemFromCart
);

cartRouter.post(
  "/apply-coupon",
  protectedRoutes,
  allowedTo("user"),
  applyCoupon
);

export default cartRouter;
