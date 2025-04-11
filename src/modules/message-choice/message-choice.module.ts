import { Module } from '@nestjs/common';
import { MessageChoiceController } from './message-choice.controller';
import { MessageChoiceService } from './message-choice.service';

@Module({
  controllers: [MessageChoiceController],
  providers: [MessageChoiceService]
})
export class MessageChoiceModule {}
