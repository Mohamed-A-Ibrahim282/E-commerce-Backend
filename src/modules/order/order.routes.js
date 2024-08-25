import { Router } from "express";

import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

import {
  createCashOrder,
  createCheckOutSession,
  getOrders,
} from "./order.controller.js";

const orderRouter = Router();

// 1-Add cart
orderRouter.post("/:id", protectedRoutes, allowedTo("user"), createCashOrder);
orderRouter.get("/", protectedRoutes, allowedTo("admin"), getOrders);
orderRouter.post(
  "/checkout/:id",
  protectedRoutes,
  allowedTo("user"),
  createCheckOutSession
);

export default orderRouter;
