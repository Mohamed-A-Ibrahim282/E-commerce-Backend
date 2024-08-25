import { AppError } from "../../utils/appError.js";
import {
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";
import { User } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";

// 1-Add User
const addUser = catchError(async (req, res, next) => {
  let user = await User(req.body);
  await user.save();
  res.status(201).json({ message: "success", user });
});

// 2-Get all Users
const getAllUsers = getAllDocuments(User);

// 3-Get User
const getUser = getDocument(User);

// 4-Update User
const updateUser = catchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return next(new AppError("User not found", 404));
  res.status(201).json({ message: "success", user });
});

// 5-Delete User
const deleteUser = deleteOne(User);

export { addUser, getAllUsers, getUser, updateUser, deleteUser };
