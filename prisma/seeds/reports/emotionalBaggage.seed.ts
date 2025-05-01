import { PrismaClient, SentenceType } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';

export class EmotionalBaggageSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        sentence:
          'You are in a non happy relationship but unable to let go. What keeps you hanging on? Whatever the situation is, there are only three ways to deal with it. ACCEPT IT, CHANGE IT, or AVOID IT. If you need help, we can help you figure out which path is best for you.',
        condition: {
          GTE: { 'awareness_objectives.scared_move_relationship': 15 }
        }
      },
      {
        sentence:
          'You are stuck on your ex and that causes several issues. First of all, you might be fueled with emotions such as loss, sadness, resentment, anger, nostalgia or even a drop in confidence. These feelings may make you unconsciously unavailable, yet may push you into rebound situations. On the one hand, you are not in a good place to allow yourself to open up to dating someone new as you have unresolved issues that block you emotionally. On the other hand, you tend to look for a persona in possible dates that is polarized. That is, either too similar to the persona of your ex or completely the opposite. ',
        condition: {
          GTE: { 'self_improvement.get_over_ex': 15 }
        }
      },
      {
        sentence:
          'A common challenge with people who have been burned in relationships, is that they build walls around them and don’t actually allow anyone in. You seem to have lost trust and may block yourself from reaching true intimacy.\n' +
          'Another challenge is that you bring all those past pains to each new relationship with possessiveness. You need to be careful so that you don’t create toxic relationships.\n' +
          'All in all, you can’t trust anyone to love you if your sense of self love isn’t healthy enough to know that you will survive if it fails. We suggest that you also seek the help of a coach/counselor/ therapist in order to maximize your chances of a healthy relationship.',
        condition: {
          'biggestChallenges.burnedInRelationships': true,
          'mateRelationship.commitedRelationship': true,
          'personType.possessive': true
        }
      },
      {
        sentence:
          'A common challenge with people who have been burned in relationships, is that they build walls around them and don’t actually allow anyone in. You seem to have lost trust and may block yourself from reaching true intimacy.',
        condition: {
          'biggestChallenges.burnedInRelationships': false,
          'mateRelationship.commitedRelationship': false,
          'personType.possessive': false
        }
      },
      {
        sentence:
          'If you find yourself that you are often in situations where you are having a great time with a partner but are noticing that you are reluctant to move to the next level to date seriously, you may come to realize that you have difficulty with commitment.\n' +
          'Commitment is being able to dedicate oneself to a person, cause, or activity. In the context of the typical monogamous relationship, commitment usually means you are willing to go through the phases of a relationship together. There is a sense of progression. If you struggle in seeing yourself dedicated to one person it could be that in reality you are still enjoying casual dating or maybe you have not found the right person to do so. How can you know the difference?',
        condition: {
          GTE: { 'self_improvement.commitment_issues': 15 },
          OR: {
            'mateRelationship.casual': true,
            'mateRelationship.sexual': true,
            'mateRelationship.situationship': true
          }
        }
      },
      {
        sentence:
          'You seem to have a healthy idea of what an “ideal” mate is about. You are looking for an all-rounded person. Try not to compromise your vision due to any other factors.',
        condition: {
          AND: [
            {
              OR: {
                'mateType.sexy': true,
                'mateType.romantic': true,
                'mateType.sexualChemistry': true,
                'mateType.passionate': true,
                'mateType.loyal': true,
                'mateType.trustworthy': true,
                'mateRelationship.trustworthy': true
              }
            },
            {
              GTE: { 'awareness_objectives.picky': 15 }
            },
            {
              OR: {
                'mateType.humorous': true,
                'mateType.adventurous': true,
                'mateType.common_interests': true,
                'mateType.sociable': true,
                'mateType.dynamic': true
              }
            }
          ]
        }
      }
    ];
    for (const sentenceEntity of sentences) {
      await prisma.sentence.upsert({
        where: {
          sentence: sentenceEntity.sentence
        },
        update: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.EMOTIONAL_BAGGAGE
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.EMOTIONAL_BAGGAGE
        }
      });
    }
  }
}
