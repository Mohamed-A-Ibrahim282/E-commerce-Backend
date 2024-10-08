import { Router } from "express";
import {
  addSubcategory,
  deleteSubcategory,
  getAllSubcategory,
  getSubcategory,
  updateSubcategory,
} from "./subCategory.controller.js";
import { subcategoryValidation } from "./subcategory.validation.js";
import { validate } from "../../middleware/validate.js";

const subcategoryRouter = Router({ mergeParams: true });

// 1-Add subcategory
subcategoryRouter.post("/", validate(subcategoryValidation), addSubcategory);

// 2-Get all categories
subcategoryRouter.get("/", getAllSubcategory);

// 3-Get subcategory
subcategoryRouter.get("/:id", getSubcategory);

// 4-Update subcategory
subcategoryRouter.put("/:id", updateSubcategory);

// 5-Delete subcategory
subcategoryRouter.delete("/:id", deleteSubcategory);

export default subcategoryRouter;
