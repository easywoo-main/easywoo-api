import { Controller,  Get, Param } from '@nestjs/common';
import {ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StepChatMessageService } from './step-chat-message.service';
import { StepChatMessageEntity } from './step-chat-message.entity';
import { ErrorResponse } from '../../../../errorHandler/errorResponse.dto';

@Controller('step-chat-message')
export class StepChatMessageController {
    constructor(private readonly stepChatMessageService: StepChatMessageService) {}

    @Get(':userId')
    @ApiOperation({ summary: 'Get step chat messages by user ID' })
    @ApiResponse({ status: 200, description: 'List of step chat messages.', type: [StepChatMessageEntity] })
    @ApiResponse({ status: 401, description: 'Unauthorized access.', type: ErrorResponse })
    public async getStepChatMessagesByUserId(@Param('userId') userId: string) {
        return this.stepChatMessageService.getStepChatMessagesByUserId(userId);
    }
}
