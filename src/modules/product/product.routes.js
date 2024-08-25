import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "./product.controller.js";
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";

const productRouter = Router();

// 1-Add Product
productRouter.post(
  "/",
  uploadMixOfFiles(
    [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ],
    "products"
  ),
  addProduct
);

// 2-Get all Products
productRouter.get("/", getAllProducts);

// 3-Get Product
productRouter.get("/:id", getProduct);

// 4-Update Product
productRouter.put(
  "/:id",
  uploadMixOfFiles(
    [
      { name: "imageCover", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ],
    "products"
  ),
  updateProduct
);

// 5-Delete Product
productRouter.delete("/:id", deleteProduct);

export default productRouter;
