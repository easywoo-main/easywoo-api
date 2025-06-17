import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
