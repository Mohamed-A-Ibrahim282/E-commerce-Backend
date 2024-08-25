import { Router } from "express";

import {
  addToWishList,
  getLoggedWithWishList,
  removeFromWishList,
} from "./wishlist.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const wishlistRouter = Router();

// 1-Add wishlist
wishlistRouter.patch("/", protectedRoutes, allowedTo("user"), addToWishList);
wishlistRouter.get(
  "/",
  protectedRoutes,
  allowedTo("user"),
  getLoggedWithWishList
);
wishlistRouter.delete(
  "/id",
  protectedRoutes,
  allowedTo("user"),
  removeFromWishList
);

export default wishlistRouter;
