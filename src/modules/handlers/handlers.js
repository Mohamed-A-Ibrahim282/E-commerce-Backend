import slugify from "slugify";
import { ApiFeature } from "../../utils/apiFeature.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";

// refactor add document
export const addDocument = (model) => {
  return catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name);

    if (req.file && req.file.fieldname === "logo") {
      req.body.logo = req.file.filename;
    } else {
      req.body.image = req.file.filename;
    }

    let document = await model(req.body);
    await document.save();
    res.status(201).json({ message: "success", document });
  });
};

//refactor get one
export const getDocument = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findById(req.params.id);
    if (!document) return next(new AppError("document not found", 404));

    res.status(200).json({ message: "success", document });
  });
};

// refactor get all and handle pagination
export const getAllDocuments = (model) => {
  return catchError(async (req, res, next) => {
    let apiFeatures = new ApiFeature(model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .search()
      .pagination();

    // Get the total number of model
    let totalDocuments = await model.countDocuments();
    let totalPages = Math.ceil(totalDocuments / apiFeatures.limit);

    // pagination info
    let paginationInfo = {
      currentPage: apiFeatures.pageNumber,
      totalPages: totalPages,
      totalItems: totalDocuments,
      nextPage:
        apiFeatures.pageNumber < totalPages ? apiFeatures.pageNumber + 1 : null,
      previousPage:
        apiFeatures.pageNumber > 1 ? apiFeatures.pageNumber - 1 : null,
    };
    // get documents
    let documents = await apiFeatures.mongooseQuery;

    res
      .status(200)
      .json({ message: "success", pagination: paginationInfo, documents });
  });
};

// refactor delete one
export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    let document = await model.findByIdAndDelete(req.params.id);
    if (!document) return next(new AppError("document not found", 404));
    res.status(200).json({ message: "success", document });
  });
};
