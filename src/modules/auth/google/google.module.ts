import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import {TokenModule} from "../../token/token.module";
import {UserModule} from "../../user/user.module";
import {GoogleStrategy} from "./google.strategy";

@Module({
  imports: [TokenModule, UserModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy]
})
export class GoogleModule {}
