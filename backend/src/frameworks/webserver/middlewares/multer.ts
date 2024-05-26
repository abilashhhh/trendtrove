import Multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Please upload only images.'));
  }
  cb(null, true);
};

const uploadToMulter = Multer({
  storage,
  fileFilter,
});

export default uploadToMulter;
