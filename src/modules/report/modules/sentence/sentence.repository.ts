import { PrismaService } from '../../../../database/prisma.service';
import { SentenceType } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SentenceRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllSentencesByType(type: SentenceType) {
    return this.prisma.sentence.findMany({
      where: {
        type: type,
      },
    });
  }
}
