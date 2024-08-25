import { Router } from "express";

import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
} from "./coupon.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const couponRouter = Router();

// 1-Add brand
couponRouter.post("/", protectedRoutes, allowedTo("admin"), addCoupon);

// 2-Get all brands
couponRouter.get("/", getAllCoupons);

// 3-Get Brand
couponRouter.get("/:id", getCoupon);

// 4-Update Brand
couponRouter.put("/:id", updateCoupon);

// 5-Delete Brand
couponRouter.delete("/:id", deleteCoupon);

export default couponRouter;
