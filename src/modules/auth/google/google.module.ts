import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';
import { GoogleStrategy } from './google.strategy';
import {GoogleClient} from "./googleClient";

@Module({
  imports: [TokenModule, UserModule, GoogleClient],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy, GoogleClient],
})
export class GoogleModule {}
