import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResultMessageChoiceService } from './result-message-choice.service';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ResultMessageChoiceEntity } from './result-message-choice.entity';
import { PageRequestArgs } from '../../../../utils/pageable.utils';

@Controller('result-message-choice')
export class ResultMessageChoiceController {
  constructor(private readonly resultMessageChoiceService: ResultMessageChoiceService) {
  }

  @Get(':messageChoiceId')
  @ApiOperation({ summary: 'Get result message choices by user ID' })
  @ApiResponse({ status: 200, description: 'List of result message choices.', type: [ResultMessageChoiceEntity] })
  @ApiResponse({ status: 404, description: 'Choices not found.', type: ErrorResponse })
  public async getResultMessageChoicesByUserId(@Param('messageChoiceId') messageChoiceId: string, @Query() pageRequestArgs: PageRequestArgs) {
    return this.resultMessageChoiceService.getResultMessageChoicesByUserId(messageChoiceId, pageRequestArgs);
  }
}
