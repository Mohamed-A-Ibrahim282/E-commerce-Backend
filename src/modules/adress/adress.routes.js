import { Router } from "express";

import {
  addAddress,
  getLoggedAddresses,
  removeAdresses,
} from "./adress.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const addressRouter = Router();

// 1-Add address
addressRouter.patch("/", protectedRoutes, allowedTo("user"), addAddress);

// get addresses
addressRouter.get("/", protectedRoutes, allowedTo("user"), getLoggedAddresses);

// delete address
addressRouter.delete("/id", protectedRoutes, allowedTo("user"), removeAdresses);

export default addressRouter;
