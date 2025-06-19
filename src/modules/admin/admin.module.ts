import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { AdminController } from './admin.controller';

@Module({
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
