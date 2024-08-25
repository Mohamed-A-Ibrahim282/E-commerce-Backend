import { AppError } from "../../utils/appError.js";
import {
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";
import { Review } from "../../../database/models/review.model.js";
import { catchError } from "../../middleware/catchError.js";

// 1-Add Review
const addReview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;

  let isExist = await Review.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (isExist) return next(new AppError("Review created before", 409));

  let review = new Review(req.body);
  await review.save();
  res.status(201).json({ message: "success", review });
});

// 2-Get all Reviews
const getAllReviews = getAllDocuments(Review);

// 3-Get Review
const getReview = getDocument(Review);

// 4-Update Review
const updateReview = catchError(async (req, res, next) => {
  let review = await Review.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!review)
    return next(new AppError("you are not the owner of review", 404));
  res.status(201).json({ message: "success", review });
});

// 5-Delete Review
const deleteReview = deleteOne(Review);

export { addReview, getAllReviews, getReview, updateReview, deleteReview };
