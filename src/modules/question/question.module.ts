import { Module } from '@nestjs/common';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireRepository } from './questionnaire.repository';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService, QuestionnaireRepository],
  exports: [QuestionnaireService],
})
export class QuestionnaireModule {}
