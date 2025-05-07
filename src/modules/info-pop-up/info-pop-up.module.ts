import { Module } from '@nestjs/common';
import { InfoPopUpController } from './info-pop-up.controller';
import { InfoPopUpService } from './info-pop-up.service';
import { InfoPopUpRepository } from './info-pop-up.repository';

@Module({
  controllers: [InfoPopUpController],
  providers: [InfoPopUpService, InfoPopUpRepository]
})
export class InfoPopUpModule {}
