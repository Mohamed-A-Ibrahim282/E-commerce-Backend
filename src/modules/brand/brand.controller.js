import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Brand } from '../../../dbConnection/models/Brand.model.js';
import slugify from 'slugify';

// 1-Add brand 
const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let brand = await Brand(req.body)
    await brand.save()
    res.status(201).json({ message: "success", brand })
})

// 2-Get all brands 
const getAllBrands = catchError(async (req, res) => {
    let brands = await Brand.find()

    res.status(200).json({ message: "success", brands })
})

// 3-Get brand 
const getBrand = catchError(async (req, res) => {
    let brand = await Brand.findById(req.params.id)
    if (!brand) return next(new appError(`brand not found`, 404))

    res.status(200).json({ message: "success", brand })
})

// 4-Update brand 
const updateBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!brand) return next(new appError('brand not found', 404));
    res.status(201).json({ message: "success", brand })
})

// 5-Delete brand 
const deleteBrand = catchError(async (req, res, next) => {
    let brand = await Brand.findByIdAndDelete(req.params.id)
    if (!brand) return next(new appError(`brand not found`, 404))
    res.status(200).json({ message: "success", brand })
})



export {
    addBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand,
}