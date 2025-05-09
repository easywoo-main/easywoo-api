import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultSliderPropService } from './result-slider-prop.service';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';

@ApiTags('Result Slider Prop')
@Controller('result-slider-prop')
export class ResultSliderPropController {
  constructor(private readonly resultSliderPropService: ResultSliderPropService) {
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get result slider props by user ID' })
  @ApiResponse({ status: 200, description: 'List of result slider props.', type: [ResultSliderPropEntity] })
  @ApiResponse({ status: 404, description: 'Props not found.', type: ErrorResponse })
  public async getResultSliderPropsByUserId(@Param('userId') userId: string) {
    return this.resultSliderPropService.getResultSliderPropsByUserId(userId);
  }
}
