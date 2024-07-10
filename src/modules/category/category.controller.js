import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Category } from './../../../dbConnection/models/category.model.js';
import slugify from 'slugify';

// 1-Add category 
const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let category = await Category(req.body)
    await category.save()
    res.status(201).json({ message: "success", category })
})

// 2-Get all categories 
const getAllCategories = catchError(async (req, res) => {
    let categories = await Category.find()

    res.status(200).json({ message: "success", categories })
})

// 3-Get category 
const getCategory = catchError(async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) return next(new appError(`category not found`, 404))

    res.status(200).json({ message: "success", category })
})

// 4-Update category 
const updateCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!category) return next(new appError('category not found', 404));
    res.status(201).json({ message: "success", category })
})

// 5-Delete category 
const deleteCategory = catchError(async (req, res, next) => {
    let category = await Category.findByIdAndDelete(req.params.id)
    if (!category) return next(new appError(`category not found`, 404))
    res.status(200).json({ message: "success", category })
})



export {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
}