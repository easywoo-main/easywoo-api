import { Module } from '@nestjs/common';
import { UserTextMessageAnswerController } from './user-text-message-answer.controller';
import { UserTextMessageAnswerService } from './user-text-message-answer.service';
import { UserTextMessageAnswerRepository } from './user-text-message-answer.repository';

@Module({
  controllers: [UserTextMessageAnswerController],
  providers: [UserTextMessageAnswerService, UserTextMessageAnswerRepository],
  exports: [UserTextMessageAnswerService]
})
export class UserTextMessageAnswerModule {
}
