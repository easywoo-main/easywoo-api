import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { CheckExists } from '../../decorators';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { CreateChatMessageWithAnswersDto } from './dto/createChatMessageWithAnswers.dto';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
  ) {
  }

  public async createChatMessage({ answers, goToStep, ...newChatMessage }: CreateChatMessageWithAnswersDto) {
    const createChatMessageWithRelationDto: CreateChatMessageWithRelationDto = newChatMessage;
    if (goToStep) {
      const nextMessage = await this.findChatMessageByStepIdAndChatId(goToStep, newChatMessage.chatId);
      createChatMessageWithRelationDto.nextMessageId = nextMessage.id
    }

    if (answers && answers.length > 0) {
      await Promise.all(answers.map(async ({goToStep, ...answer}) => {
         const nextMessage =  await this.findChatMessageByStepIdAndChatId(goToStep, newChatMessage.chatId);
        (createChatMessageWithRelationDto.answers ?? []).push({...answer, nextMessageId: nextMessage.id});
      }));
    }
    return this.chatMessageRepository.createChatMessage(createChatMessageWithRelationDto);
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessageWithRelationById(chatMessageId: string, userIds?: string | string[]) {
    return this.chatMessageRepository.findChatMessageByIdRecursive(
      chatMessageId,
      userIds ? Array.isArray(userIds) ? userIds : [userIds]: []
    );
  }

  @CheckExists('There is no such step with such stepId')
  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string) {
    return this.chatMessageRepository.findChatMessageByStepIdAndChatId(stepId, chatId);

  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(chatMessageId: string, chatMessage: UpdateChatMessageDto) {
    await this.findChatMessageWithRelationById(chatMessageId);

    return this.chatMessageRepository.updateChatMessage(chatMessageId, chatMessage);
  }

  public async deleteChatMessageById(chatMessageId: string) {
    await this.findChatMessageWithRelationById(chatMessageId);
    return this.chatMessageRepository.deleteChatMessage(chatMessageId);
  }

  public async findAllByChatMessageId(filterChatMessage: FilterChatMessage) {
    const [chatMessages, count] = await Promise.all([
      this.chatMessageRepository.findMessagesWithoutNextId(filterChatMessage),
      this.chatMessageRepository.countMessagesWithoutNextId(filterChatMessage)
    ]);

    return filterChatMessage.toPageResponse(chatMessages, count);
  }

}
