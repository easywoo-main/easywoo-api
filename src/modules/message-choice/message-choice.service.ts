import { ForbiddenException, Injectable } from '@nestjs/common';
import { MessageChoiceRepository } from './message-choice.repository';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { CheckExists } from '../../decorators';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { MessageType } from '@prisma/client';

@Injectable()
export class MessageChoiceService {
  constructor(
    private readonly messageChoiceRepository: MessageChoiceRepository,
    private readonly chatMessageService: ChatMessageService
  ) {
  }

  public async createMessageChoice(data: CreateMessageChoiceWithRelationDto) {
    return this.messageChoiceRepository.createMessageChoice(data);
  }

  public async updateMessageChoice(id: string, data: Partial<UpdateMessageChoiceDto>) {
    const existingMessageChoice = await this.findMessageChoiceById(id);
    const prevChatMessage = await this.chatMessageService.findChatMessagesWithPropsById(existingMessageChoice.prevMessageId);
    if (prevChatMessage.type === MessageType.CHALLENGE) {
      throw new ForbiddenException('You do not have permission to modify messages of type CHALLENGE.');
    }
    return this.messageChoiceRepository.updateMessageChoice(id, data);
  }

  public async deleteMessageChoice(id: string) {
    await this.findMessageChoiceById(id);
    return this.messageChoiceRepository.deleteMessageChoice(id);
  }

  @CheckExists('MessageChoice not found')
  public async findMessageChoiceById(id: string) {
    return this.messageChoiceRepository.findMessageChoiceById(id);
  }
}