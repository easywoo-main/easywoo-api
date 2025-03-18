import { Module } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { TokenModule } from '../modules/token/token.module';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [UserModule, TokenModule],
  // providers: [Use],
  exports: [],
})
export class CommonModule {}
