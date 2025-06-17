import { ConflictException, Injectable } from '@nestjs/common';
import { ChatMessageRepository } from './chat-message.repository';
import { CheckExists } from '../../decorators';
import { FilterChatMessage } from './dto/filterChatMessageQuery.dto';
import { CreateChatMessageWithAnswersDto } from './dto/createChatMessageWithAnswers.dto';
import { CreateChatMessageWithRelationDto } from './dto/createChatMessageWithRelation.dto';
import { UpdateChatMessageWithAnswersDto } from './dto/updateChatMessageWithAnswers.dto';
import { UpdateChatMessageWithRelationDto } from './dto/updateChatMessageWithRelation.dto';
import { MessageChoiceService } from '../message-choice/message-choice.service';
import { ChatMessageUniqueFieldsDto } from './dto/chatMessageUniqueFields.dto';
import { CreateAnswerDto } from './dto/createUserAnswer.dto';
import { ResultMessageChoiceService } from '../progres-tracker-chat/modules/result-message-choice/result-message-choice.service';
import { StepChatMessageService } from '../progres-tracker-chat/modules/step-chat-message/step-chat-message.service';
import { ResultSliderPropService } from '../progres-tracker-chat/modules/result-slider-prop/result-slider-prop.service';
import {
  UserTextMessageAnswerService
} from '../progres-tracker-chat/modules/user-text-message-answer/user-text-message-answer.service';

@Injectable()
export class ChatMessageService {
  constructor(
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly messageChoiceService: MessageChoiceService,
  ) {
  }

  public async createChatMessage({
                                   answers,
                                   ...newChatMessage
                                 }: CreateChatMessageWithAnswersDto) {
    const createChatMessageWithRelationDto: CreateChatMessageWithRelationDto = newChatMessage;
    await this.validateStepUniqueness({ ...newChatMessage, chatId: newChatMessage.chatId });

    if (newChatMessage.goToStep !== undefined) {
      createChatMessageWithRelationDto.nextMessageId = await this.findChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, newChatMessage.goToStep);
    }

    if (newChatMessage.restartFrom !== undefined) {
      createChatMessageWithRelationDto.restartMessageId = await this.findChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, newChatMessage.restartFrom);
    }

    if (answers?.length > 0) {
      await Promise.all(answers.map(async (answer) => {
        let nextMessageId: string | null;

        if (answer.goToStep !== undefined) {
          nextMessageId = await this.findChatMessageIdByStepIdAndChatId(createChatMessageWithRelationDto.chatId, answer.goToStep);
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

  @CheckExists('Chat Message Not Found')
  public async findChatMessagesWithPropsById(chatMessageId: string) {
    return this.chatMessageRepository.findChatMessagesWithPropsById(chatMessageId);
  }

  public async updateChatMessageById(
    chatMessageId: string,
    { answers, ...newChatMessage }: UpdateChatMessageWithAnswersDto
  ) {
    const chatMessage = await this.findChatMessageWithRelationById(chatMessageId);

    const updateDto: UpdateChatMessageWithRelationDto = newChatMessage;

    await this.validateStepUniqueness({ ...updateDto, chatId: chatMessage.chatId }, chatMessageId);

    if (newChatMessage.goToStep !== undefined) {
      updateDto.nextMessageId = await this.findChatMessageIdByStepIdAndChatId(chatMessage.chatId, newChatMessage.goToStep);
    }

    if (newChatMessage.restartFrom !== undefined) {
      updateDto.restartMessageId = await this.findChatMessageIdByStepIdAndChatId(chatMessage.chatId, newChatMessage.restartFrom);
    }

    updateDto.answersIds = [];
    if (answers && answers.length > 0) {
      await Promise.all(
        answers.map(async ( answer) => {
          let nextMessageId: string | null;

          if (answer.goToStep !== undefined) {
            nextMessageId = await this.findChatMessageIdByStepIdAndChatId(chatMessage.chatId, answer.goToStep);
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

  private async validateStepUniqueness(message: ChatMessageUniqueFieldsDto, messageId?: string) {
    if (!message) return;
    if (message.stepId) {
      const messageIdWhichHaveStepId = await this.findChatMessageIdByStepIdAndChatId(message.chatId, message.stepId);
      if (messageIdWhichHaveStepId && (messageId ? messageIdWhichHaveStepId != messageId: true)) {
        throw new ConflictException('The step id must be unique');
      }
    }

    if (message.stepName) {
      const messageIdWhichHaveStepName = await this.findChatMessageIdByStepNameAndChatId(message.chatId, message.stepName);
      if (messageIdWhichHaveStepName && (messageId ? messageIdWhichHaveStepName != messageId: true)) {
        throw new ConflictException('The step name must be unique');
      }
    }
  }

  private async findChatMessageIdByStepIdAndChatId(chatId: string, stepId: number): Promise<string | null> {
    if (chatId === null || stepId === null) return null;
    const chatMessage = await this.chatMessageRepository.findChatMessageByStepIdAndChatId(stepId, chatId);
    return chatMessage?.id || null;
  }

  private async findChatMessageIdByStepNameAndChatId(chatId: string, stepName: string): Promise<string | null> {
    if (chatId === null || stepName === null) return null;
    const chatMessage = await this.chatMessageRepository.findChatMessageByStepNameAndChatId(stepName, chatId);
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
