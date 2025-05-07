import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StepChatMessageService } from './step-chat-message.service';
import { AuthGuard } from 'src/guard';
import { UserDetails } from 'src/decorators';
import { UserPayload } from 'src/interfaces';
import { CreateStepChatMessageDto } from './dtos/createStepChatMessage.dto';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';
import { ChatMessageWithRelationsDto } from 'src/modules/chat-message/dto/messageWithRelations.dto';
import { ChatMessageWithPropsDto } from 'src/modules/chat-message/dto/messageWithProps.dto';

@Controller('step-chat-message')
export class StepChatMessageController {
    constructor(private readonly stepChatMessageService: StepChatMessageService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a step chat message' })
    @ApiResponse({ status: 201, description: 'The step chat message has been successfully created.', type: ChatMessageWithPropsDto })
    @ApiResponse({ status: 400, description: 'Invalid input.', type: ErrorResponse})
    @ApiResponse({ status: 401, description: 'Unauthorized access.', type: ErrorResponse })
    public async createStepChatMessage(@Body() data: CreateStepChatMessageDto, @UserDetails() user: UserPayload) {
        return this.stepChatMessageService.createStepChatMessage(data, user.id);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get step chat messages by user ID' })
    @ApiResponse({ status: 200, description: 'List of step chat messages.', type: [StepChatMessageEntity] })
    @ApiResponse({ status: 401, description: 'Unauthorized access.', type: ErrorResponse })
    public async getStepChatMessagesByUserId(@Param('userId') userId: string) {
        return this.stepChatMessageService.getStepChatMessagesByUserId(userId);
    }
}
