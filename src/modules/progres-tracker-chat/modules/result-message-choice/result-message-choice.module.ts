import { Module } from '@nestjs/common';
import { ResultMessageChoiceController } from './result-message-choice.controller';
import { ResultMessageChoiceService } from './result-message-choice.service';
import { ResultMessageChoiceRepository } from './result-message-choice.repository';
import { TokenModule } from 'src/modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [ResultMessageChoiceController],
  providers: [ResultMessageChoiceService, ResultMessageChoiceRepository],
  imports: [TokenModule, UserModule],
})
export class ResultMessageChoiceModule {}
