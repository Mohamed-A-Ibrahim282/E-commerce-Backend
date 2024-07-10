import { Category } from '../../../dbConnection/models/category.model.js';
import { Subcategory } from '../../../dbConnection/models/subCategory.model.js';
import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import slugify from 'slugify';

// 1-Add subcategory 
const addSubcategory = catchError(async (req, res, next) => {
    let category = await Category.findById(req.body.category)
    if (!category) return next(new appError(`category not found`, 404))
    
    req.body.slug = slugify(req.body.name)
    let subcategory = await Subcategory(req.body)
    await subcategory.save()
    res.status(201).json({ message: "success", subcategory })
})

// 2-Get all categories 
const getAllSubcategory = catchError(async (req, res, next) => {
    let subcategories = await Subcategory.find()

    res.status(200).json({ message: "success", subcategories })
})

// 3-Get Subcategory 
const getSubcategory = catchError(async (req, res, next) => {
    let subcategory = await Subcategory.findById(req.params.id)
    if (!subcategory) return next(new appError(`subcategory not found`, 404))

    res.status(200).json({ message: "success", subcategory })
})

// 4-Update Subcategory 
const updateSubcategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!subcategory) return next(new appError('subcategory not found', 404));
    res.status(201).json({ message: "success", subcategory })
})

// 5-Delete Subcategory 
const deleteSubcategory = catchError(async (req, res, next) => {
    let subcategory = await Subcategory.findByIdAndDelete(req.params.id)
    if (!subcategory) return next(new appError(`subcategory not found`, 404))
    res.status(200).json({ message: "success", subcategory })
})



export {
    addSubcategory,
    getAllSubcategory,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory,
}