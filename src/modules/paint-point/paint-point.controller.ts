import { Controller, Get, Query } from '@nestjs/common';
import { PaintPointService } from './paint-point.service';
import { PageRequest } from '../../utils/page-request.utils';

@Controller('pain-point')
export class PaintPointController {
  constructor(private readonly paintPointService: PaintPointService) {}

  @Get()
  public async getAllPaintPoints(@Query() pageRequest: PageRequest) {
    return this.paintPointService.getAllPaintPoints(pageRequest);
  }
}
