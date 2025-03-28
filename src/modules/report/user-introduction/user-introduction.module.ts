import { Module } from '@nestjs/common';
import { UserIntroductionService } from './user-introduction.service';

@Module({
  providers: [UserIntroductionService],
  exports: [UserIntroductionService],
})
export class UserIntroductionModule {}
