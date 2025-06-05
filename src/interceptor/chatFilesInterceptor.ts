import { FilesInterceptor } from '@nestjs/platform-express';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../utils/constants.utils';
import { UnsupportedMediaTypeException } from '@nestjs/common';

export const ChatFilesInterceptor = (fileName = "file") => {
  return FilesInterceptor(fileName, undefined, {
    fileFilter: (req, file, cb) => {
      if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new UnsupportedMediaTypeException('Unsupported file type'), false);
      }
    },
  });
};
