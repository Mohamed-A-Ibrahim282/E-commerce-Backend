import { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { categoryValidation } from "./category.validation.js";


const categoryRouter = Router()

// 1-Add category 
categoryRouter.post('/', validate(categoryValidation), addCategory)

// 2-Get all categories
categoryRouter.get('/', getAllCategories)

// 3-Get category
categoryRouter.get('/:id', getCategory)

// 4-Update category
categoryRouter.put('/:id', updateCategory)

// 5-Delete category
categoryRouter.delete('/:id', deleteCategory)


export default categoryRouter