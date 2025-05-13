import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';
import { ChatMessageWithPropsDto } from './dto/messageWithProps.dto';

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
                                   infoPopUps,
                                   ...data
                                 }: CreateChatMessageDto): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.create({
      data: {
        ...data,
        ...(nextChoices && { nextChoices: { createMany: { data: nextChoices, skipDuplicates: true } } }),
        ...(sliderProps && { sliderProps: { create: sliderProps } }),
        ...(infoPopUps && { infoPopUps: { create: infoPopUps } }),
        ...(chatId && { chat: { connect: { id: chatId } } }),
        ...(prevMessageId && { prevMessages: { connect: { id: prevMessageId } } }),
        ...(prevChoiceId && { prevChoices: { connect: { id: prevChoiceId } } })
      }

    });
  }


  public async findChatMessageById(id: string, userIds: string[]): Promise<ChatMessageWithRelationsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: {
          include: {
            resultMessageChoice: { where: { userId: { in: userIds } } }
          }
        },
        sliderProps: true,
        nextMessage: true,
        infoPopUps: true,
        stepChatMessages: {
          where: {
            user: {
              id: { in: userIds }
            }
          }
        }
      }
    });
  }

  public async findChatMessagesWithPropsById(id: string): Promise<ChatMessageWithPropsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        sliderProps: true,
        infoPopUps: true
      }
    });
  }


  public async updateChatMessage(id: string, {
    prevMessageId,
    chatId,
    sliderProps,
    infoPopUps,
    nextMessageId,
    nextChoices,
    ...data
  }: Partial<UpdateChatMessageDto>): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.update({
      where: { id },
      data: {
        ...data,
        ...(nextChoices && {
          nextChoices: {
            disconnect: [],
            createMany: { data: nextChoices, skipDuplicates: true }
          }
        }),
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

  public async findAll() {

  }
}
