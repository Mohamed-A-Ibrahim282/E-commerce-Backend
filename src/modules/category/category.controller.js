import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import slugify from "slugify";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import {
  addDocument,
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1-Add category
const addCategory = addDocument(Category);

// 2-Get all categories
const getAllCategories = getAllDocuments(Category);

// 3-Get category
const getCategory = getDocument(Category);

// 4-Update category
const updateCategory = catchError(async (req, res, next) => {
  const existCategory = await Category.findById(req.params.id);
  if (!existCategory) return next(new AppError("Category not found", 404));

  if (req.body.name) req.body.slug = slugify(req.body.name);

  if (req.file) {
    if (existCategory.image) {
      // Extract the filename from the image path
      const oldImageFilename = path.basename(existCategory.image);
      // Correct the path to the actual uploads directory
      const oldImgPath = path.join(
        __dirname,
        "../../../uploads/categories",
        oldImageFilename
      );

      // Log the file path
      console.log(`Attempting to delete file: ${oldImgPath}`);

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(oldImgPath)) {
        fs.unlinkSync(oldImgPath);
        console.log(`File deleted: ${oldImgPath}`);
      } else {
        console.warn(`File not found: ${oldImgPath}`);
      }
    }

    req.body.image = req.file.filename;
  }

  let category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return next(new AppError("Category not found", 404));

  res.status(201).json({ message: "success", category });
});
// 5-Delete category
const deleteCategory = deleteOne(Category);

export {
  addCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
