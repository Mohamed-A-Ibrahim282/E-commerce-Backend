import { AppError } from "../utils/appError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const validationObject = {
      ...req.body,
      ...req.params,
      ...req.query,
    };

    // Include file fields if they exist
    if (req.file) {
      if (req.file.fieldname === "logo") validationObject.logo = req.file;
      if (req.file.fieldname === "image") validationObject.image = req.file;
    }

    const { error } = schema.validate(validationObject, { abortEarly: false });

    if (!error) {
      next();
    } else {
      const errMsg = error.details.map((err) => err.message);
      next(new AppError(errMsg, 401));
    }
  };
};
