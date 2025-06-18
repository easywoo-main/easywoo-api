import { Module } from '@nestjs/common';
import { AdminCredentialsController } from './admin-credentials.controller';
import { AdminCredentialsService } from './admin-credentials.service';
import { AdminModule } from '../../admin/admin.module';
import { TokenModule } from '../../token/token.module';

@Module({
  controllers: [AdminCredentialsController],
  providers: [AdminCredentialsService],
  imports: [AdminModule, TokenModule]
})
export class AdminCredentialsModule {}
