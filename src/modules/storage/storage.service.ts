import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getChatMessagePath, getPublicPath } from '../../utils/storage.utils';
import * as fs from 'fs/promises';
import * as path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: Express.Multer.File, targetPath: string) {
    const destination = targetPath || getPublicPath();
    const folderPath = path.join(destination);

    try {
      await fs.mkdir(folderPath, { recursive: true });
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create directory: ${folderPath}. Error: ${error.message}`);
    }

    const fileName = uuidv4() + path.extname(file.originalname);
    const filePath = path.join(folderPath, fileName);

    try {
      await fs.writeFile(filePath, file.buffer);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to save the file: ${fileName}. Error: ${error.message}`);
    }

    return `${this.configService.get<string>('BASE_URL')}/${destination}/${fileName}`;
  }

  public async uploadChatMessageFiles(files: Express.Multer.File[], folder:string = "") {
    return Promise.all(files.map(async (file) => this.uploadFile(file, path.join(getChatMessagePath(), folder))));
  }
}
