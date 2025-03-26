import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { AppleModule } from './apple/apple.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [GoogleModule, AppleModule, CredentialsModule],
})
export class AuthModule {}
