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
                                   goToStep,
                                   restartFrom,
                                   ...newChatMessage
                                 }: CreateChatMessageWithAnswersDto) {
    const createChatMessageWithRelationDto: CreateChatMessageWithRelationDto = newChatMessage;

    if (goToStep !== undefined) {
      createChatMessageWithRelationDto.nextMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, goToStep);
    }

    if (restartFrom !== undefined) {
      createChatMessageWithRelationDto.restartMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, restartFrom);
    }

    if (answers?.length > 0) {
      await Promise.all(answers.map(async ({goToStep: answerGoToStep, ...answer}) => {
        let nextMessageId: string | null;

        if (answerGoToStep !== undefined) {
          nextMessageId = await this.getChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, answerGoToStep);
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

  @CheckExists('There is no such step with such stepId')
  public async findChatMessageByStepIdAndChatId(stepId: number, chatId: string) {
    return this.chatMessageRepository.findChatMessageByStepIdAndChatId(stepId, chatId);
  }

  @CheckExists('Chat Message Not Found')
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(
    chatMessageId: string,
    { answers, goToStep, restartFrom, ...newChatMessage }: UpdateChatMessageWithAnswersDto
  ) {
    const chatMessage = await this.findChatMessageWithRelationById(chatMessageId);

    const updateDto: UpdateChatMessageWithRelationDto = { ...newChatMessage };

    if (goToStep !== undefined) {
      updateDto.nextMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, goToStep);
    }

    if (restartFrom !== undefined) {
      updateDto.restartMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, restartFrom);
    }


    if (answers && answers.length > 0) {
      await Promise.all(
        answers.map(async ({ goToStep: answerGoToStep, ...answer }) => {
          let nextMessageId: string | null;

          if (answerGoToStep !== undefined) {
            nextMessageId = await this.getChatMessageIdByStepIdAndChatId(chatMessage.chatId, answerGoToStep);
          }

          if (answer.id) {
            await this.messageChoiceService.updateMessageChoice(answer.id, {
              ...answer,
              nextMessageId
            });
          } else {
            await this.messageChoiceService.createMessageChoice({
              ...answer,
              prevMessageId: chatMessageId,
              nextMessageId
            });
          }
        })
      );
    }

    // Видалити поле nextChoices, якщо воно є
    delete updateDto.nextChoices;

    return this.chatMessageRepository.updateChatMessage(chatMessageId, updateDto);
  }

  private async getChatMessageIdByStepIdAndChatId(chatId: string, stepId: number): Promise<string | null> {
    if (chatId === null || stepId === null) return null;
    const chatMessage = await this.findChatMessageByStepIdAndChatId(stepId, chatId);
    return chatMessage.id;
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
