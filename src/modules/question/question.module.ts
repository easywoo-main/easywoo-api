import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionRepository } from './question.repository';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { QuestionMapper } from './question.mapper';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionRepository, QuestionMapper],
  exports: [QuestionService],
})
export class QuestionModule {}
