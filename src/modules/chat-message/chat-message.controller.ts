import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatMessageService } from './chat-message.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';

@Controller('chat-message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new chat message' })
  @ApiResponse({ status: 201, description: 'Chat message successfully created', type: ChatMessageEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  public async createChatMessage(@Body() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessageService.createChatMessage(createChatMessageDto);
  }


  @Get('/:id')
  @ApiOperation({ summary: 'Fetch a chat message by ID' })
  @ApiResponse({ status: 200, description: 'Chat message retrieved successfully', type: ChatMessageWithRelationsDto })
  @ApiResponse({ status: 404, description: 'Chat message not found', type: ErrorResponse })
  public async findChatMessageById(@Param('id') id: string) {
    return this.chatMessageService.findChatMessageWithRelationById(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a chat message by ID' })
  @ApiResponse({ status: 200, description: 'Chat message successfully updated', type: ChatMessageEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  @ApiResponse({ status: 404, description: 'Chat message not found', type: ErrorResponse })
  public async updateChatMessage(
    @Param('id') id: string,
    @Body() updateChatMessageDto: Partial<UpdateChatMessageDto>,
  ) {
    console.log(id)
    return this.chatMessageService.updateChatMessageById(id, updateChatMessageDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a chat message by ID' })
  @ApiResponse({ status: 200, description: 'Chat message successfully deleted', type: ChatMessageEntity })
  @ApiResponse({ status: 404, description: 'Chat message not found', type: ErrorResponse })
  public async deleteChatMessage(@Param('id') id: string) {
    return this.chatMessageService.deleteChatMessageById(id);
  }
}