import { Module } from '@nestjs/common';
import { AdminCredentialsController } from './admin-credentials.controller';
import { AdminCredentialsService } from './admin-credentials.service';

@Module({
  controllers: [AdminCredentialsController],
  providers: [AdminCredentialsService]
})
export class AdminCredentialsModule {}
