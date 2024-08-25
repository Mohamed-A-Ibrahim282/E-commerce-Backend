import { Category } from "../../../database/models/category.model.js";
import { Subcategory } from "../../../database/models/subCategory.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import slugify from "slugify";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeature } from "../../utils/apiFeature.js";

// 1-Add subcategory
const addSubcategory = catchError(async (req, res, next) => {
  let category = await Category.findById(req.body.category);
  if (!category) return next(new AppError(`category not found`, 404));

  req.body.slug = slugify(req.body.name);
  let subcategory = await Subcategory(req.body);
  await subcategory.save();
  res.status(201).json({ message: "success", subcategory });
});

// 2-Get all categories
const getAllSubcategory = catchError(async (req, res, next) => {
  // for merge params
  let filterObj = {};
  if (req.params.category) filterObj.category = req.params.category;

  let apiFeatures = new ApiFeature(Subcategory.find(filterObj), req.query)
    .pagination()
    .filter()
    .sort()
    .fields()
    .search();
  let subcategories = await apiFeatures.mongooseQuery;

  res
    .status(200)
    .json({ message: "success", page: apiFeatures.pageNumber, subcategories });
});

// 3-Get Subcategory
const getSubcategory = catchError(async (req, res, next) => {
  let subcategory = await Subcategory.findById(req.params.id);
  if (!subcategory) return next(new AppError(`subcategory not found`, 404));

  res.status(200).json({ message: "success", subcategory });
});

// 4-Update Subcategory
const updateSubcategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = await Subcategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!subcategory) return next(new AppError("subcategory not found", 404));
  res.status(201).json({ message: "success", subcategory });
});

// 5-Delete Subcategory
const deleteSubcategory = deleteOne(Subcategory);

export {
  addSubcategory,
  getAllSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
