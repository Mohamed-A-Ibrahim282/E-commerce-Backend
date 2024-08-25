import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import { User } from "../../../database/models/user.model.js";

// 1-Add Adresses
const addAddress = catchError(async (req, res, next) => {
  let address = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { addresses: req.body } },
    { new: true }
  );
  if (!address) return next(new AppError("address not found", 404));
  res.status(201).json({ message: "success", address: address.addresses });
});

const getLoggedAddresses = catchError(async (req, res, next) => {
  let address = await User.findById(req.user._id);
  if (!address) return next(new AppError("address not found", 404));
  res.status(201).json({ message: "success", address });
});

// 3- remove address
const removeAdresses = catchError(async (req, res, next) => {
  let address = await User.findByIdAndDelete(
    { _id: req.params.id },
    { $pull: { addresses: { _id: req.params.id } } },
    {
      new: true,
    }
  );
  if (!address) return next(new AppError("address not found", 404));
  res.status(201).json({ message: "success", address: address.addresses });
});

export { addAddress, removeAdresses, getLoggedAddresses };
