import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/appError.js";

export const checkEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) return next(new AppError("Email is already Exist", 409));

  next();
};
