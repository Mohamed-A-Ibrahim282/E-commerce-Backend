import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  getBrand,
  updateBrand,
} from "./brand.controller.js";
import { brandValidation, updateValidation } from "./brand.validation.js";
import { validate } from "../../middleware/validate.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";

const brandRouter = Router();

// 1-Add brand
brandRouter.post(
  "/",
  uploadSingleFile("logo", "brands"),
  validate(brandValidation),
  addBrand
);

// 2-Get all brands
brandRouter.get("/", getAllBrands);

// 3-Get Brand
brandRouter.get("/:id", getBrand);

// 4-Update Brand
brandRouter.put("/:id", uploadSingleFile("logo", "brands"), updateBrand);

// 5-Delete Brand
brandRouter.delete("/:id",deleteBrand);

export default brandRouter;
