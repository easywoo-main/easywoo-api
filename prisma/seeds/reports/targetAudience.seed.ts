import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';
import { Seeder } from '../main/seeder.interface';

export class TargetAudienceSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        sentence:
          'You seem to have a specific idea of what you are looking for in a mate. This can be a good mechanism as it protects you from having to endure disappointing dates, yet on the other hand this can narrow down the pool of potential dates. Ensure that you are also giving a chance to dates that may have the potential to improve on certain aspects, such as their appearance, attributes or circumstances. Being more open to what you are looking for, gives you the opportunity to date different people and have the chance to explore a variety of characteristics and attributes in a person that you may not have even been aware that you are looking for.',
        condition: {
          GTE: { 'awareness_objectives.picky': 15 },
          'biggestChallenges.confidenceIssues': true,
          'mateType.adventurous': true,
        },
      },
      {
        sentence:
          'You would like your partner to be open minded, to try new things and be willing to challenge ideas and enter new experiences. On the other hand, you would like someone that will allow you space to be your own self.',
        condition: {
          OR: {
            'mateRelationship.casual': true,
            'mateRelationship.committed': true,
            'mateRelationship.sexual': true,
            'mateRelationship.situationship': true,
          },
          'mate_persona.adventurous': true,
        },
      },
      {
        sentence: '',
        condition: {
          NOT: {
            OR: {
              'mateRelationship.casual': true,
              'mateRelationship.committed': true,
              'mateRelationship.sexual': true,
              'mateRelationship.situationship': true,
            },
          },
          'mate_persona.adventurous': true,
        },
      },
      {
        sentence:
          'What you may consider an ideal mate, may in reality, actually not be the right fit for you. We would suggest that you reassess your priorities in what you are looking for in a mate to avoid focussing on non- realistic or unimportant attributes and characteristics that do not match your own.',
        condition: {
          GTE: { 'awareness_objectives.wrong_choice_partner': true },
          OR: {
            'mateRelationship.commited_relationship': true,
            'mateRelationship.friendship': true,
          },
        },
      },
    ];

    for (const sentenceEntity of sentences) {
      await prisma.sentence.upsert({
        where: {
          sentence: sentenceEntity.sentence,
        },
        update: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.EASY_SOCIAL,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.EASY_SOCIAL,
        },
      });
    }
  }
}
