import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/dto/condition.dto';

async function main(prisma: PrismaClient) {
  const sentences: {
    condition: Condition;
    sentence: string;
  }[] = [];

  for (const sentenceEntity of sentences) {
    await prisma.sentence.upsert({
      where: {
        sentence: sentenceEntity.sentence,
      },
      update: {
        condition: sentenceEntity.condition,
        sentence: sentenceEntity.sentence,
        type: SentenceType.FinalConsiderations,
      },
      create: {
        condition: sentenceEntity.condition,
        sentence: sentenceEntity.sentence,
        type: SentenceType.FinalConsiderations,
      },
    });
  }
}

export { main as userIntroductionSeed };
