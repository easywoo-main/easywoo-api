import { Global, Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { AppleModule } from './apple/apple.module';
import { CredentialsModule } from './credentials/credentials.module';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { AdminCredentialsModule } from './admin-credentials/admin-credentials.module';

@Global()
@Module({
  imports: [GoogleModule, AppleModule, CredentialsModule, TokenModule, UserModule, AdminCredentialsModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
