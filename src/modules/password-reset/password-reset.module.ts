import { Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetRepository } from './password-reset.repository';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [
    UserModule,
    EmailModule,
    TokenModule,
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, PasswordResetRepository]
})
export class PasswordResetModule {}
