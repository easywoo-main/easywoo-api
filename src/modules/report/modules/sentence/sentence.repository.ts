import { Repository } from '../../../../database/repository.service';
import { SentenceType } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';

@Injectable()
export class SentenceRepository {
  private readonly sentenceRepository: Prisma.SentenceDelegate;
  constructor(repository: Repository) {
    this.sentenceRepository = repository.sentence
  }

  public async getAllSentencesByType(type: SentenceType) {
    return this.sentenceRepository.findMany({
      where: {
        type: type,
      },
    });
  }
}
