import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TokenModule } from './modules/token/token.module';
import {QuestionnaireModule} from "./modules/questionnaire/questionnaire.module";
import { QuestionnaireAnswerModule } from './modules/questionnaire-answer/questionnaire-answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    TokenModule,
    QuestionnaireModule,
    QuestionnaireAnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
