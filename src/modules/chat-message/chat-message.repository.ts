import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateChatMessageDto } from './dto/createChatMessage.dto';
import { ChatMessageWithRelationsDto } from './dto/messageWithRelations.dto';
import { ChatMessageEntity } from './chat-message.entity';
import { UpdateChatMessageDto } from './dto/updateChatMessage.dto';

@Injectable()
export class ChatMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createChatMessage(data: CreateChatMessageDto): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.create({
      data,
    });
  }

  public async findChatMessageById(id: string): Promise<ChatMessageWithRelationsDto> {
    return this.prisma.chatMessage.findUnique({
      where: { id },
      include: {
        nextChoices: true,
        nextMessage: true,
      }
    });
  }

  public async updateChatMessage(id: string, data: Partial<UpdateChatMessageDto>): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.update({
      where: { id },
      data,
    });
  }

  public async deleteChatMessage(id: string): Promise<ChatMessageEntity> {
    return this.prisma.chatMessage.delete({
      where: { id },
    });
  }
}
