import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Brand } from "../../../database/models/brand.model.js";
import {
  addDocument,
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

// 1-Add brand
const addBrand = addDocument(Brand);

// 2-Get all brands
const getAllBrands = getAllDocuments(Brand);

// 3-Get brand
const getBrand = getDocument(Brand);

// 4-Update brand
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updateBrand = catchError(async (req, res, next) => {
  const existBrand = await Brand.findById(req.params.id);
  if (!existBrand) return next(new AppError("Brand not found", 404));

  if (req.body.name) req.body.slug = slugify(req.body.name);

  if (req.file) {
    if (existBrand.logo) {
      // Construct the path to the old logo
      const oldLogoFileName = path.basename(existBrand.logo);
      const oldLogoPath = path.join(
        __dirname,
        "../../../uploads/brands",
        oldLogoFileName
      );

      // Log the file path
      console.log(`Attempting to delete file: ${oldLogoPath}`);

      // Check if the file exists before deleting
      if (fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
        console.log(`File deleted: ${oldLogoPath}`);
      } else {
        console.warn("Logo not found at: ", oldLogoPath);
      }
    }

    // Save the new logo filename
    req.body.logo = req.file.filename;
  }

  // Update the brand in the database
  let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!brand) return next(new AppError("Brand not found", 404));

  res.status(201).json({ message: "success", brand });
});
// 5-Delete brand
const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand };
