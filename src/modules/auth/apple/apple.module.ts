import { Module } from '@nestjs/common';
import { AppleService } from './apple.service';
import { AppleController } from './apple.controller';
import { TokenModule } from '../../token/token.module';
import { UserModule } from '../../user/user.module';
import { AppleStrategy } from './apple.strategy';
import { AppleUserRepository } from './apple.repository';

@Module({
  imports: [TokenModule, UserModule],
  providers: [AppleService, AppleStrategy, AppleUserRepository],
  controllers: [AppleController],
})
export class AppleModule {}
