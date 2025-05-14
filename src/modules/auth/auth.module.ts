import { Global, Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { AppleModule } from './apple/apple.module';
import { CredentialsModule } from './credentials/credentials.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

@Global()
@Module({
  imports: [GoogleModule, AppleModule, CredentialsModule, TokenModule, UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
