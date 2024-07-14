import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addProduct, deleteProduct, getAllproducts, getProduct, updateProduct } from "./product.controller.js";
import { productValidation } from "./product.validation.js";


const productRouter = Router()

// 1-Add category 
productRouter.post('/', validate(productValidation), addProduct)

// 2-Get all Product
productRouter.get('/', getAllproducts)

// 3-Get Product
productRouter.get('/:id', getProduct)

// 4-Update Product
productRouter.put('/:id', updateProduct)

// 5-Delete Product
productRouter.delete('/:id', deleteProduct)


export default productRouter