import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js";
import { brandValidation } from './brand.validation.js';


const brandRouter = Router()

// 1-Add brand 
brandRouter.post('/', validate(brandValidation), addBrand)

// 2-Get all brands
brandRouter.get('/', getAllBrands)

// 3-Get Brand
brandRouter.get('/:id', getBrand)

// 4-Update Brand
brandRouter.put('/:id', updateBrand)

// 5-Delete Brand
brandRouter.delete('/:id', deleteBrand)


export default brandRouter