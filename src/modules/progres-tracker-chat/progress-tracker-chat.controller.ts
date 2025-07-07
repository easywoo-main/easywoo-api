import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProgressTrackerChatService } from './progress-tracker-chat.service';
import { CreateUserStepDto } from '../chat-message/dto/createUserStep.dto';
import { AuthGuard } from '../../guard';
import { UserDetails } from '../../decorators';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatMessageWithChoicesDto } from '../chat-message/dto/messageWithChoices.dto';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { Success } from '../../utils/success.utils';
import { FilterChatMessage } from '../chat-message/dto/filterChatMessageQuery.dto';
import { StepChatMessageDto } from './modules/step-chat-message/dtos/stepChatMessage.dto';

@Controller('progress-tracker-chat')
export class ProgressTrackerChatController {
  constructor(
    private readonly progressTrackerChatService: ProgressTrackerChatService
  ) {
  }


  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the next chat message based on the current message and user input' })
  @ApiOkResponse(
    {
      description: 'Chat ended',
      type: Success
    }
  )
  @ApiResponse({
    status: 201,
    description: 'Next chat message retrieved successfully',
    type: ChatMessageWithChoicesDto
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ErrorResponse
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    type: ErrorResponse
  })
  @ApiResponse({
    status: 404,
    description: 'Chat message not found',
    type: ErrorResponse
  })
  public async getNextChatMessage(
    @Body() createUserStepDto: CreateUserStepDto,
    @UserDetails() user: UserPayload
  ) {
    return this.progressTrackerChatService.createUserAnswerAndGetNextMessage(createUserStepDto, user.id);
  }


  @Get("last")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the last chat message' })
  @ApiOkResponse({type: ChatMessageWithChoicesDto})
  public async findCurrentChatMessage(
    @Query("chatId") chatId: string,
    @UserDetails() user: UserPayload
  ): Promise<ChatMessageWithChoicesDto> {
      return this.progressTrackerChatService.findCurrentChatMessage(chatId, user.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get chat message history for the user' })
  @ApiOkResponse({
    description: 'Chat message history retrieved successfully',
    type: StepChatMessageDto,
    isArray: true
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid query parameters',
    type: ErrorResponse
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    type: ErrorResponse
  })
  public async getChatMessageHistory(
    @Query() filterChatMessage: FilterChatMessage,
    @UserDetails() user: UserPayload
  ){
    return this.progressTrackerChatService.getChatMessageHistory(filterChatMessage, user.id);
  }
}
