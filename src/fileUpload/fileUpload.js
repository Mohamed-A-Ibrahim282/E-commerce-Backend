import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/appError.js";

const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("images only", 401), false);
    }
  }

  const uploads = multer({ storage, fileFilter });
  return uploads;
};
// upload single file
export const uploadSingleFile = (fieldName, folderName) =>
  fileUpload(folderName).single(fieldName);

// upload files
export const uploadMixOfFiles = (arrayOfFieldes, folderName) =>
  fileUpload(folderName).fields(arrayOfFieldes);
