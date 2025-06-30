import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatMessageService } from './chat-message.service';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithProps.dto';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { CreateChatMessageWithAnswersDto } from './dto/createChatMessageWithAnswers.dto';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {
  }

  @Post() @ApiOperation({ summary: 'Create a new chat message' }) @ApiResponse({
    status: 201,
    description: 'Chat message successfully created',
    type: ChatMessageEntity
  }) @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    type: ErrorResponse
  }) public async createChatMessage(@Body() createChatMessageDto: CreateChatMessageWithAnswersDto) {
    return this.chatMessageService.createChatMessage(createChatMessageDto);
  }


  @Get('/:id') @ApiOperation({ summary: 'Fetch a chat message by ID' }) @ApiResponse({
    status: 200,
    description: 'Chat message retrieved successfully',
    type: ChatMessageWithRelationsDto
  }) @ApiResponse({
    status: 404,
    description: 'Chat message not found',
    type: ErrorResponse
  }) public async findChatMessageById(@Param('id') id: string) {
    return this.chatMessageService.findChatMessageWithRelationById(id);
  }

  @Get() @ApiOperation({ summary: 'Fetch all chat message' })
  public async findAllChatMessages(@Query() filterChatMessage: FilterChatMessage) {
    return this.chatMessageService.findAllByChatMessageId(filterChatMessage);
  }

  @Patch('/:id') @ApiOperation({ summary: 'Update a chat message by ID' }) @ApiResponse({
    status: 200,
    description: 'Chat message successfully updated',
    type: ChatMessageEntity
  }) @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse }) @ApiResponse({
    status: 404,
    description: 'Chat message not found',
    type: ErrorResponse
  }) public async updateChatMessage(@Param('id') id: string, @Body() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessageService.updateChatMessageById(id, updateChatMessageDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a chat message by ID' })
  @ApiResponse({
    status: 200,
    description: 'Chat message successfully deleted',
    type: ChatMessageEntity
  })
  @ApiResponse({
    status: 404,
    description: 'Chat message not found',
    type: ErrorResponse
  }) public async deleteChatMessage(@Param('id') id: string) {
    return this.chatMessageService.deleteChatMessageById(id);
  }

}