import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleModule } from './google/google.module';
import { AppleModule } from './apple/apple.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [UserModule, GoogleModule, AppleModule, CredentialsModule],
})
export class AuthModule {}
