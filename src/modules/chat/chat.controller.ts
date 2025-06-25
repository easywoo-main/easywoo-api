import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Version } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/createChat.dto';
import { UpdateChatDto } from './dto/updateChatDto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { ChatEntity } from './chat.entity';
import { AdminGuard, AuthGuard } from '../../guard';
import { UserDetails } from '../../decorators';
import { PageRequest } from 'src/utils/page-request.utils';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { pageRequestSchema } from '../../schemas/page-request.schema';
import { ChatMessageWithRelationsDto } from '../chat-message/dto/messageWithProps.dto';
import { ChatFilter } from './dto/chatFilter.dto';
import { chatFilterSchema } from './schema/chatFilter.schema';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  // @Get("/admin")
  // @UseGuards(AdminGuard)
  // @ApiOperation({ summary: 'Fetch all chats with pagination' })
  // @ApiResponse({ status: 200, description: 'Chats retrieved successfully', type: [ChatEntity] })
  // public async findAllAdminChats(@Query(new JoiValidationPipe(pageRequestSchema)) pageRequest: PageRequest) {
  //   return this.chatService.findAllChat(pageRequest);
  // }

  @Get('/:chatId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Fetch a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat retrieved successfully', type: ChatEntity })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async findChatById(@Param('chatId') chatId: string) {
    return this.chatService.findChatById(chatId);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all chats with pagination' })
  @ApiResponse({ status: 200, description: 'Chats retrieved successfully', type: [ChatEntity] })
  public async findAllChats(@Query(new JoiValidationPipe(pageRequestSchema)) pageRequest: PageRequest) {
    return this.chatService.findAllUserChats(pageRequest);
  }

  @Get()
  @Version("2")
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Fetch all admin chats with pagination' })
  @ApiResponse({ status: 200, description: 'Chats retrieved successfully', type: [ChatEntity] })
  public async findAllAdminChats(@Query(new JoiValidationPipe(chatFilterSchema)) chatFilter: ChatFilter) {
    return this.chatService.findAllChats(chatFilter);
  }

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Create a new chat' })
  @ApiResponse({ status: 201, description: 'Chat successfully created', type: ChatEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  public async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Post("/:chatId")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a chat for a user' })
  @ApiResponse({ status: 200, description: 'Chat started successfully and return first step', type: ChatMessageWithRelationsDto})
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  @ApiResponse({ status: 401, description: 'Unauthorized access', type: ErrorResponse })
  public async startChat(@Param('chatId') chatId: string, @UserDetails() user: UserPayload) {
    return this.chatService.startChat(chatId, user.id);
  }

  @Patch('/:chatId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Update a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat successfully updated', type: ChatEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async updateChat(
    @Param('chatId') chatId: string,
    @Body() updateChatDto: UpdateChatDto
  ) {
    return this.chatService.updateChat(chatId, updateChatDto);
  }

  @Delete('/:chatId')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Delete a chat by ID' })
  @ApiResponse({ status: 200, description: 'Chat successfully deleted', type: ChatEntity })
  @ApiResponse({ status: 404, description: 'Chat not found', type: ErrorResponse })
  public async deleteChat(@Param('chatId') chatId: string) {
    return this.chatService.deleteChat(chatId);
  }
}