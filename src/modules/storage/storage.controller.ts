import { Controller, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ChatFilesInterceptor } from '../../interceptor/chatFilesInterceptor';
import { StorageService } from './storage.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('storage')
export class StorageController {

  constructor(private readonly storageService: StorageService) {
  }

  @Post('chat-message')
  @ApiOperation({ summary: 'Upload chat message files' })
  @ApiResponse({ status: 201, description: 'Files successfully uploaded' })
  @ApiResponse({ status: 400, description: 'Invalid file upload request' })
  @UseInterceptors(ChatFilesInterceptor("files"))
  public async uploadChatMessageFiles(@UploadedFiles()  files: Express.Multer.File[], @Query("folder") folder?: string) {
    return await this.storageService.uploadChatMessageFiles(files);
  }
}
