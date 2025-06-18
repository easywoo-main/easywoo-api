import { Module } from '@nestjs/common';
import { ResultSliderPropController } from './result-slider-prop.controller';
import { ResultSliderPropService } from './result-slider-prop.service';
import { ResultSliderPropRepository } from './result-slider-prop.repository';
import { TokenModule } from 'src/modules/token/token.module';
import { UserModule } from 'src/modules/user/user.module';
import { ChatMessageModule } from 'src/modules/chat-message/chat-message.module';
import { ChatModule } from '../../../chat/chat.module';
import { SliderPropModule } from '../../../slider-prop/slider-prop.module';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  controllers: [ResultSliderPropController],
  providers: [ResultSliderPropService, ResultSliderPropRepository],
  imports: [
    AuthModule,
    ChatModule, SliderPropModule
  ],
  exports: [ResultSliderPropService]
  
})
export class ResultSliderPropModule {}
