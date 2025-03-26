import { Module } from '@nestjs/common';
import { IntroService } from './intro.service';

@Module({
  providers: [IntroService]
})
export class IntroModule {}
