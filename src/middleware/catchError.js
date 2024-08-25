import { AppError } from "../utils/appError.js";

export const catchError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      if (err) {
        next(new AppError(err.message, err.statusCode));
      }
    });
  };
};
