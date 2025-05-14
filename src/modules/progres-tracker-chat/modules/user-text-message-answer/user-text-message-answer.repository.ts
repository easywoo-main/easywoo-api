import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateUpdateTextMessageAnswerDto } from './create-update-text-message-answer.dto';

@Injectable()
export class UserTextMessageAnswerRepository {
  constructor(private readonly prisma: PrismaService) {
  }

  public async createTextMessageAnswer(data: CreateUpdateTextMessageAnswerDto) {
    return this.prisma.userTextMessageAnswers.create({
      data
    });
  }
}
