import { Injectable } from '@nestjs/common';
import { SentenceType } from '@prisma/client';
import { SentenceEntity } from './sentence.entity';
import { SentenceRepository } from './sentence.repository';

@Injectable()
export class SentenceService {
  constructor(private readonly sentenceRepository: SentenceRepository) {}

  public async getAllSentencesByType(type: SentenceType): Promise<SentenceEntity[]> {
    return this.sentenceRepository.getAllSentencesByType(type);
  }
}
