import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createChatMessage({
                                   prevMessageId,
                                   chatId,
                                   sliderProps,
                                   prevChoiceId,
                                   nextChoices,
                                   ...data
                                 }: CreateChatMessageDto): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.create({
      data: {
        ...data,
        ...(nextChoices && {nextChoices: {createMany: {data: nextChoices, skipDuplicates: true}}}),
        ...(sliderProps && { sliderProps: { create: sliderProps } }),
        ...(chatId && { chat: { connect: { id: chatId } } }),
        ...(prevMessageId && { prevMessages: { connect: { id: prevMessageId } } }),
        ...(prevChoiceId && { prevChoices: { connect: { id: prevChoiceId } } })
      }

    });
  }

  public async findChatMessageById(id: string): Promise<ChatMessageWithRelationsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        nextMessage: true,
        sliderProps: true,
      }
    });
  }

  public async updateChatMessage(id: string, {
    prevMessageId,
    chatId,
    sliderProps,
    nextMessageId,
    nextChoices,
    ...data
  }: Partial<UpdateChatMessageDto>): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.update({
      where: { id },
      data: {
        ...data,
        ...(nextChoices && {nextChoices: {
            disconnect: [],
            createMany: {data: nextChoices, skipDuplicates: true}
        }}),
        ...(prevMessageId && { prevMessages: { connect: { id: prevMessageId } } }),
        ...(chatId && { chat: { connect: { id: chatId } } }),
        ...(nextMessageId && { nextMessage: { connect: { id: nextMessageId } } })
      }
    });
  }

  public async deleteChatMessage(id: string): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.delete({
      where: { id }
    });
  }
}
