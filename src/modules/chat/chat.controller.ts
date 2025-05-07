import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PageRequest, PageRequestArgs, PageResponse } from '../../utils/pageable.utils';
import { CreateChatDto } from './dto/createChat.dto';
import { UpdateChatDto } from './dto/updateChatDto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatEntity } from './chat.entity';
import { AuthGuard } from '../../guard';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { ChatWithMessageDto } from './dto/chatWithMessage.dto';
import { ChatMessageWithPropsDto } from '../chat-message/dto/messageWithProps.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @Get('/:chatId')
  @ApiOperation({ summary: 'Fetch a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat retrieved successfully', type: ChatEntity })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async findChatById(@Param('chatId') chatId: string) {
    return this.chatService.findChatById(chatId);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all chats with pagination' })
  @ApiResponse({ status: 200, description: 'Chats retrieved successfully', type: [ChatEntity] })
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

  @Post("/:chatId")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Start a chat for a user' })
  @ApiResponse({ status: 200, description: 'Chat started successfully', type: ChatMessageWithPropsDto })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized access', type: ErrorResponse })
  public async startChat(@Param('chatId') chatId: string, @UserDetails() user: UserPayload) {
    return this.chatService.startChat(chatId, user.id);
  }

  @Patch('/:chatId')
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat successfully updated', type: ChatEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async updateChat(
    @Param('chatId') chatId: string,
    @Body() updateChatDto: Partial<UpdateChatDto>
  ) {
    return this.chatService.updateChat(chatId, updateChatDto);
  }

  @Delete('/:chatId')
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat successfully deleted', type: ChatEntity })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }
}