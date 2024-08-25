import { Router } from "express";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "./user.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const userRouter = Router();

// 1-Add User
userRouter.post("/", checkEmail, addUser);

// 2-Get all Users
userRouter.get("/", getAllUsers);

// 3-Get User
userRouter.get("/:id", getUser);

// 4-Update User
userRouter.put("/:id", updateUser);

// 5-Delete User
userRouter.delete("/:id", deleteUser);

export default userRouter;
