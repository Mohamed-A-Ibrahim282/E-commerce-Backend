import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import {
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";
import { Coupon } from "../../../database/models/coupon.model.js";

// 1-Add brand
const addCoupon = catchError(async (req, res, next) => {
  let isExist = await Coupon.findOne({ code: req.body.code });
  if (isExist) next(new AppError("coupon not found", 404));
  let coupon = new Coupon(req.body);
  await coupon.save();

  res.status(201).json({ message: "success", coupon });
});

// 2-Get all Coupons
const getAllCoupons = getAllDocuments(Coupon);

// 3-Get Coupon
const getCoupon = getDocument(Coupon);

// 4-Update Coupon
const updateCoupon = catchError(async (req, res, next) => {
  let Coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!Coupon) return next(new AppError("Coupon not found", 404));
  res.status(201).json({ message: "success", Coupon });
});

// 5-Delete Coupon
const deleteCoupon = deleteOne(Coupon);

export { addCoupon, getAllCoupons, getCoupon, updateCoupon, deleteCoupon };
