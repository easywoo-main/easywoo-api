import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultSliderPropService } from './result-slider-prop.service';
import { AuthGuard } from 'src/guard';
import { UserDetails } from 'src/decorators';
import { UserPayload } from 'src/interfaces';
import { CreateResultSliderPropDto } from './dtos/createResultSliderProp.dto';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ResultSliderPropEntity } from './result-slider-prop.entity';

@ApiTags('Result Slider Prop')
@Controller('result-slider-prop')
export class ResultSliderPropController {
  constructor(private readonly resultSliderPropService: ResultSliderPropService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a result slider prop' })
  @ApiResponse({ status: 201, description: 'The result slider prop has been successfully created.', type: ResultSliderPropEntity })
  @ApiResponse({ status: 400, description: 'Invalid input.',  type: ErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized access.', type: ErrorResponse })
  public async createResultSliderProp(@Body() data: CreateResultSliderPropDto, @UserDetails() user: UserPayload) {
    return this.resultSliderPropService.createResultSliderProp(data, user.id);
  }

  @Post('bulk')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create multiple result slider props' })
  @ApiResponse({ status: 201, description: 'The result slider props have been successfully created.', type: [ResultSliderPropEntity] })
  @ApiResponse({ status: 400, description: 'Invalid input.', type: ErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized access.', type: ErrorResponse })
  public async createManyResultSliderProp(@Body() data: CreateResultSliderPropDto[], @UserDetails() user: UserPayload) {
    return this.resultSliderPropService.createManyResultSliderProp(data, user.id);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get result slider props by user ID' })
  @ApiResponse({ status: 200, description: 'List of result slider props.', type: [ResultSliderPropEntity] })
  @ApiResponse({ status: 404, description: 'Props not found.', type: ErrorResponse })
  public async getResultSliderPropsByUserId(@Param('userId') userId: string) {
    return this.resultSliderPropService.getResultSliderPropsByUserId(userId);
  }
}
