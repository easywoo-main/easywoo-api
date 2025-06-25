import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultSliderPropService } from './result-slider-prop.service';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';
import { UserDetails } from '../../../../decorators';
import { UserPayload } from '../../../token/payloads/userPayload.interface';
import { AuthGuard } from '../../../../guard';
import { ChartFilter } from './dtos/sliderPropsQuery.dto';

@ApiTags('Result Slider Prop')
@Controller('result-slider-prop')
export class ResultSliderPropController {
  constructor(private resultSliderPropService: ResultSliderPropService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth() @ApiOperation({ summary: 'Get result slider props by user ID' }) @ApiResponse({
    status: 200, description: 'List of result slider props.', type: [ResultSliderPropEntity]
  }) @ApiResponse({
    status: 404, description: 'Props not found.', type: ErrorResponse
  })
  public async getResultSliderPropsByUserId(@Query() sliderPropsFilterDto: ChartFilter, @UserDetails() user: UserPayload) {


    return this.resultSliderPropService.getResultSliderPropsByUserId(sliderPropsFilterDto, user.id);
  }
}
