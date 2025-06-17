import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';
import { GoogleRepository } from './google.repository';
import { DatabaseModule } from '../../../database/database.module';
import { GoogleClient } from '../../../configs/google.config';
import { GoogleMapper } from './google.mapper';

@Module({
  imports: [DatabaseModule, TokenModule, UserModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleClient, GoogleRepository, GoogleMapper],
})
export class GoogleModule {}
