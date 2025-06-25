import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ProgressTrackerChatService } from './progress-tracker-chat.service';
import { CreateUserStepDto } from '../chat-message/dto/createUserStep.dto';
import { AuthGuard } from '../../guard';
import { UserDetails } from '../../decorators';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatMessageWithChoicesDto } from '../chat-message/dto/messageWithChoices.dto';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { Success } from '../../utils/success.utils';

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
  @ApiResponse(
    {
      status: 200,
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
}
