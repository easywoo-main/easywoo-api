import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResultMessageChoiceService } from './result-message-choice.service';
import { AuthGuard } from 'src/guard';
import { UserDetails } from 'src/decorators';
import { UserPayload } from 'src/interfaces';
import { CreateResultMessageChoiceDto } from './dtos/createResultMessageChoice.dto';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ResultMessageChoiceEntity } from './result-message-choice.entity';
import { ChatMessageWithPropsDto } from 'src/modules/chat-message/dto/messageWithProps.dto';

@Controller('result-message-choice')
export class ResultMessageChoiceController {
  constructor(private readonly resultMessageChoiceService: ResultMessageChoiceService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a result message choice' })
  @ApiResponse({ status: 201, description: 'The result message choice has been successfully created.', type: ChatMessageWithPropsDto })
  @ApiResponse({ status: 400, description: 'Invalid input.', type: ErrorResponse })
  public async createResultMessageChoice(
    @Body() data: CreateResultMessageChoiceDto,
    @UserDetails() user: UserPayload
  ) {
    return this.resultMessageChoiceService.createResultMessageChoice(data, user.id);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get result message choices by user ID' })
  @ApiResponse({ status: 200, description: 'List of result message choices.', type: [ResultMessageChoiceEntity] })
  @ApiResponse({ status: 404, description: 'Choices not found.', type: ErrorResponse })
  public async getResultMessageChoicesByUserId(@Param('userId') userId: string) {
    return this.resultMessageChoiceService.getResultMessageChoicesByUserId(userId);
  }
}
