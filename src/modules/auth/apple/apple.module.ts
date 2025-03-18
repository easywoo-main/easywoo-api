import { Module } from '@nestjs/common';
import { AppleService } from './apple.service';
import { AppleController } from './apple.controller';
import {TokenModule} from "../../token/token.module";
import {UserModule} from "../../user/user.module";

@Module({
  imports: [TokenModule, UserModule],
  providers: [AppleService],
  controllers: [AppleController]
})
export class AppleModule {}
