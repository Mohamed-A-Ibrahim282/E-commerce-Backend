import { Router } from "express";

import {
  addReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const reviewRouter = Router();

// 1-Add Review
reviewRouter.post("/", protectedRoutes, allowedTo("user"), addReview);

// 2-Get all Reviews
reviewRouter.get("/", getAllReviews);

// 3-Get Review
reviewRouter.get("/:id", getReview);

// 4-Update Review
reviewRouter.put("/:id", updateReview);

// 5-Delete Review
reviewRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("user", "admin"),
  deleteReview
);

export default reviewRouter;
