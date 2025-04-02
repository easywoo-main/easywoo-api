import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageClient } from '../../configs/storage.config';

@Module({
  providers: [StorageService, StorageClient]
})
export class StorageModule {}
