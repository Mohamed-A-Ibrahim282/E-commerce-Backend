import { catchError } from '../../middleware/catchError.js';
import { appError } from '../../utils/appError.js';
import { Product } from './../../../dbConnection/models/product.model.js';
import slugify from 'slugify';

// 1-Add product 
const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let product = await Product(req.body)
    await Product.save()
    res.status(201).json({ message: "success", product })
})

// 2-Get all products 
const getAllproducts = catchError(async (req, res) => {
    let products = await Product.find()

    res.status(200).json({ message: "success", products })
})

// 3-Get product 
const getProduct = catchError(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) return next(new appError(`product not found`, 404))

    res.status(200).json({ message: "success", product })
})

// 4-Update product 
const updateProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return next(new appError('product not found', 404));
    res.status(201).json({ message: "success", product })
})

// 5-Delete product 
const deleteProduct = catchError(async (req, res, next) => {
    let product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return next(new appError(`product not found`, 404))
    res.status(200).json({ message: "success", product })
})



export {
    addProduct,
    getAllproducts,
    getProduct,
    updateProduct,
    deleteProduct,
}