import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';
import {GoogleClient} from "./googleClient";
import {GoogleRepository} from "./google.repository";
import {DatabaseModule} from "../../../database/database.module";

@Module({
  imports: [TokenModule, UserModule, DatabaseModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleClient, GoogleRepository],
})
export class GoogleModule {}
