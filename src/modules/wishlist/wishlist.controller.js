import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

import { User } from "../../../database/models/user.model.js";

// 1-Add wishlist
const addToWishList = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  );
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.status(201).json({ message: "success", wishlist });
});

//2- get user's wishlist
const getLoggedWithWishList = catchError(async (req, res, next) => {
  let wishlist = await User.findById(req.user._id).populate("wishlist");
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.status(201).json({ message: "success", wishlist });
});

// 3- remove from wishlist
const removeFromWishList = catchError(async (req, res, next) => {
  let wishlist = await User.findByIdAndDelete(
    req.user._id,
    { $pull: { wishList: req.params.id } },
    {
      new: true,
    }
  );
  if (!wishlist) return next(new AppError("wishlist not found", 404));
  res.status(201).json({ message: "success", wishlist });
});

export { addToWishList, removeFromWishList, getLoggedWithWishList };
