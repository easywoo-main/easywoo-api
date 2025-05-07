import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  imports: [TokenModule, UserModule],
})
export class ChatModule {}
