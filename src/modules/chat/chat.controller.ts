import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PageRequest, PageRequestArgs } from '../../utils/pageable.utils';
import { CreateChatDto } from './dto/createChat.dto';
import { UpdateChatDto } from './dto/updateChatDto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatEntity } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:chatId')
  @ApiOperation({ summary: 'Fetch a chat message by ID' })
  @ApiResponse({ status: 200, description: 'Chat retrieved successfully', type: ChatEntity })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async findChatById(@Param('chatId') chatId: string) {
    return this.chatService.findChatById(chatId);
  }

  @Get()
  public async findAllChats(@Query() pageRequest: PageRequestArgs) {
    return this.chatService.findAllChat(new PageRequest(pageRequest));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({ status: 201, description: 'Chat successfully created', type: ChatEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  public async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Patch('/:chatId')
  public async updateChat(
    @Param('chatId') chatId: string,
    @Body() updateChatDto: Partial<UpdateChatDto>,
  ) {
    return this.chatService.updateChat(chatId, updateChatDto);
  }

  @Delete('/:chatId')
  public async deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }
}