import authRouter from "./modules/auth/auth.route.js";
import reviewRouter from "./modules/review/review.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.route.js";
import productRouter from "./modules/product/product.routes.js";
import subcategoryRouter from "./modules/subCategory/subcategory.routes.js";
import userRouter from "./modules/user/user.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";
import addressRouter from "./modules/adress/adress.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import orderRouter from "./modules/order/order.routes.js";

export const bootstrap = (app) => {
  app.use("/api/categories", categoryRouter);
  app.use("/api/subcategories", subcategoryRouter);
  app.use("/api/brands", brandRouter);
  app.use("/api/products", productRouter);
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/reviews", reviewRouter);
  app.use("/api/wishlists", wishlistRouter);
  app.use("/api/addresses", addressRouter);
  app.use("/api/coupons", couponRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/orders", orderRouter);
};
