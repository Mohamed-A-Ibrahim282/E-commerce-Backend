import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "./category.controller.js";
import { validate } from "../../middleware/validate.js";
import { categoryValidation } from "./category.validation.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import subcategoryRouter from "../subCategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = Router();

// 1-Add category
categoryRouter.post(
  "/",
  protectedRoutes,
  allowedTo("user", "admin", "mgr"),
  uploadSingleFile("image", "categories"),
  validate(categoryValidation),
  addCategory
);

// 2-Get all categories
categoryRouter.get("/", getAllCategories);

// 3-Get category
categoryRouter.get("/:id", getCategory);

// 4-Update category
categoryRouter.put(
  "/:id",
  // protectedRoutes,
  // allowedTo("admin", "mgr"),
  uploadSingleFile("image", "categories"),
  updateCategory
);

// 5-Delete category
categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  deleteCategory
);

//Get subCategories from Category
categoryRouter.use("/:category/subcategories", subcategoryRouter);
export default categoryRouter;
