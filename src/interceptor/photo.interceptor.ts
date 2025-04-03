import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../utils/constants.utils';
import { UnsupportedMediaTypeException } from '@nestjs/common';

export const PhotoInterceptor = (fileName = "file") => {
  return FileInterceptor(fileName, {
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
      if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new UnsupportedMediaTypeException('Unsupported file type'), false);
      }
    },
  })
}