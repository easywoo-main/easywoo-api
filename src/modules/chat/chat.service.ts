import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { CheckExists } from '../../decorators';
import { CreateChatDto } from './dto/createChat.dto';
import { UpdateChatDto } from './dto/updateChatDto';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { PageRequest } from '../../utils/page-request.utils';
import { MessageSliderService } from '../message-slider/message-slider.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly chatMessageService: ChatMessageService,
    private readonly messageSliderService: MessageSliderService
  ) {}

  public async findAllChat(pageRequest: PageRequest) {
    const [chats, count] = await Promise.all([
      this.chatRepository.findAllChats(pageRequest),
      this.chatRepository.countChats(pageRequest),
    ])

    return pageRequest.toPageResponse(chats, count);
  }

  @CheckExists('Chat not found')
  public async findChatById(chatId: string) {
    return this.chatRepository.findChatById(chatId);
  }

  public async createChat(chatDto: CreateChatDto) {
    const sliderProps = chatDto?.sliderProps ?? [];
    delete chatDto.sliderProps;
    const chat = await this.chatRepository.createChat(chatDto);
    await Promise.all(
      sliderProps.map((messageSlider)=> (this.messageSliderService.createMessageSlider({...messageSlider, chatId: chat.id})))
    )
    return chat;

  }

  public async updateChat(chatId: string, chatDto: UpdateChatDto) {
    await this.findChatById(chatId);

    await Promise.all(
      chatDto?.sliderProps?.map((messageSlider)=> (this.messageSliderService.upsertMessageSlider({...messageSlider, chatId})))
    )

    delete chatDto.sliderProps;
    return this.chatRepository.updateChat(chatId, chatDto);
  }

  public async deleteChat(chatId: string) {
    await this.findChatById(chatId);
    return this.chatRepository.deleteChat(chatId);
  }

  public async startChat(chatId: string, userId: string) {
    const chat = await this.findChatById(chatId);
    await this.chatRepository.createRelationWithUser(chatId, userId);
    return this.chatMessageService.findChatMessageWithRelationById(chat.startMessageId);
  }
}
