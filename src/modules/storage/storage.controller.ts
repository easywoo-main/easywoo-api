import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ChatFilesInterceptor } from '../../interceptor/chatFilesInterceptor';
import { StorageService } from './storage.service';
import { getAbsolutePublicPath } from '../../utils/storage.utils';

@Controller('storage')
export class StorageController {

  constructor(private readonly storageService: StorageService) {
  }

  @Post('chat-message')
  @UseInterceptors(ChatFilesInterceptor("files"))
  public async uploadChatMessageFiles(@UploadedFiles()  files: Express.Multer.File[]) {
    return await this.storageService.uploadChatMessageFiles(files);
  }
}
