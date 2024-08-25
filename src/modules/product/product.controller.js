import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { Product } from "../../../database/models/product.model.js";
import {
  deleteOne,
  getAllDocuments,
  getDocument,
} from "../handlers/handlers.js";

import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1-Add brand
const addProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  let product = await Product(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

// 2-Get all Products
const getAllProducts = getAllDocuments(Product);
// 3-Get Product
const getProduct = getDocument(Product);

// 4-Update Product
const updateProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  const existProduct = await Product.findById(req.params.id);
  if (!existProduct) return next(new AppError("Product not found", 404));

  // Handle ImageCover update
  if (req.files.imageCover) {
    if (existProduct.imageCover) {
      const oldImageCoverFilename = path.basename(existProduct.imageCover);
      const oldImageCoverPath = path.join(
        __dirname,
        "../../../uploads/products",
        oldImageCoverFilename
      );

      if (fs.existsSync(oldImageCoverPath)) {
        fs.unlinkSync(oldImageCoverPath);
      } else {
        return next(
          new AppError(`Failed to delete imageCover: ${oldImageCoverPath}`, 500)
        );
      }
    }
    req.body.imageCover = path.join(
      "uploads/products",
      req.files.imageCover[0].filename
    );
  }

  // Handle images update
  if (req.files.images) {
    if (existProduct.images && existProduct.images.length > 0) {
      existProduct.images.forEach((img) => {
        const oldImageFilename = path.basename(img);
        const oldImagePath = path.join(
          __dirname,
          "../../../uploads/products",
          oldImageFilename
        );
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (err) {
            console.error(`Failed to delete image: ${oldImagePath}`, err);
          }
        } else {
          console.error(`Image not found: ${oldImagePath}`);
        }
      });
    }
    req.body.images = req.files.images.map((img) =>
      path.join("uploads/products", img.filename)
    );
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(201).json({ message: "success", product });
});

// 5-Delete Product
const deleteProduct = deleteOne(Product);

export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
