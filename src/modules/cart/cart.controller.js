import { AppError } from "../../utils/appError.js";

import { Cart } from "../../../database/models/cart.model.js";
import { Product } from "../../../database/models/product.model.js";
import { Coupon } from "../../../database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";

function calcTotalPrice(isCartExist) {
  // total cartPrice
  isCartExist.totalCartPrice = isCartExist.cartItems.reduce((prev, item) => {
    prev += item.quantity * item.price;
  }, 0);
  if (isCartExist.discount) {
    isCartExist.totalCartPriceAfterDiscount =
      isCartExist.totalCartPrice -
      (isCartExist.totalCartPrice * isCartExist.discount) / 100;
  }
}

// 1-Add Cart to user
const addToCart = catchError(async (req, res, next) => {
  let isCartExist = await Cart.findOne({ user: req.user._id });

  let product = await Product.findById(req.body.product);
  if (!product) return next(new AppError("product not found", 404));

  req.body.price = product.price;

  if (req.body.quantity > product.stock)
    return next(new AppError("Sold Out", 404));

  if (!isCartExist) {
    let cart = new Cart({
      user: req.user._id,
      cartItems: [req.body],
    });
    // calac total price
    totalCartPrice(cart);
    await cart.save();
    res.status(201).json({ message: "success", cart });
  } else {
    let item = isCartExist.cartItems.find(
      (item) => item.product == req.body.product
    );
    if (item) {
      item.quantity += req.body.quantity || 1;

      if (item.quantity >= product.stock)
        return next(new AppError("sold out", 404));
    }

    if (!item) isCartExist.cartItems.push(req.body);

    // calac total price
    calcTotalPrice(isCartExist);
    await isCartExist.save();

    res.json({ message: "success", cart: isCartExist });
  }
});

const updateQuantity = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new AppError("cart not found", 404));

  let item = cart.cartItems.find((item) => item.product == req.params.id);
  if (!item) return next(new AppError("product not found", 404));

  item.quantity = req.body.quantity;

  calcTotalPrice(cart);

  await cart.save();

  res.status(201).json({ message: "success", cart });
});

const removeItemFromCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.id } } },
    { new: true }
  );

  calcTotalPrice(cart);
  await cart.save();
  if (!cart) return next(new AppError("address not found", 404));
  res.status(201).json({ message: "success", cart });
});

// get user logged cart
const getLoggedUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id });

  res.json({ message: "success", cart });
});

const clearUserCart = catchError(async (req, res, next) => {
  let cart = await Cart.findOneAndDelete({ user: req.user._id });
  res.status(201).json({ message: "success", cart });
});

const applyCoupon = catchError(async (req, res, next) => {
  let coupon = await Coupon.findOne({
    code: req.body.code,
    expires: { $gte: Date.now() },
  });
  if (!coupon) return next(new AppError("Opps!, coupoun invalid", 404));
  let cart = await Cart.findOne({ user: req.user._id });

  cart.discount = cart.discount;
  calcTotalPrice(cart);
  await cart.save();

  res.status(201).json({ message: "success", cart });
});
export {
  addToCart,
  updateQuantity,
  removeItemFromCart,
  getLoggedUserCart,
  clearUserCart,
  applyCoupon,
};
