import { Module } from '@nestjs/common';
import { PaintPointController } from './paint-point.controller';
import { PaintPointService } from './paint-point.service';

@Module({
  controllers: [PaintPointController],
  providers: [PaintPointService]
})
export class PaintPointModule {}
