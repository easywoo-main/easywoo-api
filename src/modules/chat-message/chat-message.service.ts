import { Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CheckExists } from '../../decorators';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { CreateChatMessageWithAnswersDto } from './dto/createChatMessageWithAnswers.dto';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';
import { UpdateChatMessageWithAnswersDto } from './dto/updateChatMessageWithAnswers.dto';
import { UpdateChatMessageWithRelationDto } from './dto/updateChatMessageWithRelation.dto';
import { MessageChoiceService } from '../message-choice/message-choice.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly messageChoiceService: MessageChoiceService
  ) {
  }

  public async createChatMessage({
                                   answers,
                                   ...newChatMessage
                                 }: CreateChatMessageWithAnswersDto) {
    const createChatMessageWithRelationDto: CreateChatMessageWithRelationDto = newChatMessage;

    if (newChatMessage.goToStep !== undefined) {
      createChatMessageWithRelationDto.nextMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, newChatMessage.goToStep);
    }

    if (newChatMessage.restartFrom !== undefined) {
      createChatMessageWithRelationDto.restartMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, newChatMessage.restartFrom);
    }

    if (answers?.length > 0) {
      await Promise.all(answers.map(async (answer) => {
        let nextMessageId: string | null;

        if (answer.goToStep !== undefined) {
          nextMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, answer.goToStep);
        }
        (createChatMessageWithRelationDto.nextChoices ??= []).push({ ...answer, nextMessageId});

      }));
    }
    return this.chatMessageRepository.createChatMessage(createChatMessageWithRelationDto);
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessageWithRelationById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessageById(
      chatMessageId,
    );
  }

  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string) {
    return this.chatMessageRepository.findChatMessageByStepIdAndChatId(stepId, chatId);
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(
    chatMessageId: string,
    { answers, ...newChatMessage }: UpdateChatMessageWithAnswersDto
  ) {
    const chatMessage = await this.findChatMessageWithRelationById(chatMessageId);

    const updateDto: UpdateChatMessageWithRelationDto = { ...newChatMessage };

    if(updateDto.stepId){

    }

    if (newChatMessage.goToStep !== undefined) {
      updateDto.nextMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, newChatMessage.goToStep);
    }

    if (newChatMessage.restartFrom !== undefined) {
      updateDto.restartMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, newChatMessage.restartFrom);
    }

    updateDto.answersIds = [];
    if (answers && answers.length > 0) {
      await Promise.all(
        answers.map(async ( answer) => {
          let nextMessageId: string | null;

          if (answer.goToStep !== undefined) {
            nextMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, answer.goToStep);
          }

          if (answer.id) {
            const {id} = await this.messageChoiceService.updateMessageChoice(answer.id, {
              ...answer,
              nextMessageId
            });
            updateDto.answersIds.push({ id });
          } else {
            const {id} =  await this.messageChoiceService.createMessageChoice({
              ...answer,
              prevMessageId: chatMessageId,
              nextMessageId
            });
            updateDto.answersIds.push({ id });

          }
        })
      );
    }

    delete updateDto.nextChoices;

    return this.chatMessageRepository.updateChatMessage(chatMessageId, updateDto);
  }

  private async getChatMessageIdByStepIdAndChatId(chatId: string, stepId: number): Promise<string | null> {
    if (chatId === null || stepId === null) return null;
    const chatMessage = await this.findChatMessageByStepIdAndChatId(stepId, chatId);
    return chatMessage?.id || null;
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
