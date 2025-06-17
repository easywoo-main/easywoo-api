import { Module } from '@nestjs/common';
import { EasywooApiService } from './easywoo-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [EasywooApiService],
  exports: [EasywooApiService],
  imports: [HttpModule],
})
export class EasywooApiModule {}
