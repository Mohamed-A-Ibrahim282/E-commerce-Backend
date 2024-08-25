import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import {
  changeUserPassword,
  protectedRoutes,
  signin,
  signup,
} from "./auth.controller.js";

const authRouter = Router();

// 1-Add brand
authRouter.post("/signup", checkEmail, signup);

// 2-Get all brands
authRouter.post("/signin", signin);

authRouter.patch("/changepassword", protectedRoutes, changeUserPassword);

export default authRouter;
