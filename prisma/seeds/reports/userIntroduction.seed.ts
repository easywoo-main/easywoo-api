import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';

async function main(prisma: PrismaClient) {
  const sentences: {
    condition: Condition;
    sentence: string;
  }[] = [
    {
      condition: {
        'personType.sensitive': true,
      },
      sentence: 'You are a sensitive person and can be emotional, especially when in a relationship. Be careful you don’t get too intense.',
    },
    {
      condition: {
        'personType.reserved': true,
        OR: [{ 'personType.humorous': true }, { 'personType.sociable': true }],
      },
      sentence: 'You tend to be reserved. If this is because of shyness or lack of confidence check our recommendations.',
    },
    {
      condition: {
        'personType.reserved': true,
        'personType.humorous':false,
        'personType.sociable': false,
      },
      sentence:
        'You tend to be rather self-aware. You have a need for lots of time alone, does this allow you to socialise enough? You take more time thinking than acting. You make for an incredible friend, as you are loyal and stable. If being reserved is a personality trait, then you should embrace it with pride! But if it hides shyness or lack of confidence then you should look at our recommendations.\n',
    },
    {
      condition: {
        'personType.romantic': true,
      },
      sentence: 'You connect with life primarily with feelings rather than logic.',
    },
    {
      condition: {
        'personType.sensitive': true,
        'personType.reserved': true,
        'personType.shy': true,
        'biggestChallenges.notHappyWithSocialLife': true,
      },
      sentence: 'You are shy and sensitive. You may be a Highly Sensitive Person ( HSP). This may encourage retreating from events or gatherings.',
    },
    {
      condition: {
        'personType.humorous': true,
        'personType.sociable': true,
        'biggestChallenges.endUpInFriendZone': false,
        'biggestChallenges.confidenceIssues': false,
      },
      sentence: 'Your outgoing personality is one of your strong points.',
    },
    {
      condition: {
        'personType.humorous': true,
        'personType.sociable': true,
        'biggestChallenges.endUpInFriendZone': true,
        'biggestChallenges.confidenceIssues': false,
      },
      sentence: 'You are sociable and humorous. Careful not to overuse instead of bringing out the erotic you.',
    },
    {
      condition: {
        'personType.humorous': true,
        'personType.sociable': true,
        'biggestChallenges.confidenceIssues': true,
      },
      sentence: 'You have an outgoing personality. You may tend to be a people pleaser.',
    },
    {
      condition: {
        'personType.ambitious': true,
        'personType.sociable': true,
        'biggestChallenges.busyToDate': true,
      },
      sentence: 'You know how to achieve targets but may forget to live in the moment.',
    },
    {
      condition: {
        'personType.adventurous': true,
        'personType.independent': true,
      },
      sentence: 'You like to try new experiences and to push yourself out of your comfort zone. You place high value on independence.',
    },
    {
      condition: {
        'personType.adventurous': true,
        'personType.independent': false,
      },
      sentence: 'You like to try new experiences and to push yourself out of your comfort zone.',
    },
    {
      condition: {
        'mateType.adventurous': true,
        OR: [{ 'mateType.reserved': true }, { 'mateType.prudent': true }],
      },
      sentence: 'You want to break out of your “box”.',
    },
    {
      condition: {
        'personType.ambitious': false,
        'personType.passionate': true,
      },
      sentence: 'You don’t call yourself ambitious but you will be once you find your true calling. Check our links.',
    },
    {
      condition: {
        'personType.ambitious': true,
        'personType.passionate': true,
        OR: [{ 'personType.shy': false }, { 'personType.sensitive': false }],
      },
      sentence: 'You are growth oriented and not afraid to get out of your comfort zone.',
    },
    {
      condition: {
        'personType.ambitious': true,
        'personType.passionate': true,
        OR: [{ 'personType.shy': true }, { 'personType.sensitive': true }],
      },
      sentence: 'You are persistent and don’t mind difficulties as long as you develop.',
    },
    {
      condition: {
        'personType.ambitious': true,
        'biggestChallenges.notHappyWithSocialLife': true,
      },
      sentence:
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group.',
    },
    {
      condition: {
        'personType.ambitious': true,
        'biggestChallenges.notHappyWithSocialLife': false,
      },
      sentence:
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group. To beat your lack of time choose activities that are easy to join.',
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
        type: SentenceType.USER_INTRODUCTION,
      },
      create: {
        condition: sentenceEntity.condition,
        sentence: sentenceEntity.sentence,
        type: SentenceType.USER_INTRODUCTION,
      },
    });
  }
}

export { main as userIntroductionSeed };

import { Seeder } from '../main/seeder.interface';

export class UserIntroductionSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        condition: {
          'personType.sensitive': true,
        },
        sentence: 'You are a sensitive person and can be emotional, especially when in a relationship. Be careful you don’t get too intense.',
      },
      {
        condition: {
          'personType.reserved': true,
          OR: [{ 'personType.humorous': true }, { 'personType.sociable': true }],
        },
        sentence: 'You tend to be reserved. If this is because of shyness or lack of confidence check our recommendations.',
      },
      {
        condition: {
          'personType.reserved': true,
          'personType.sociable': true,
        },
        sentence:
          'You tend to be rather self-aware. You have a need for lots of time alone, does this allow you to socialise enough? You take more time thinking than acting. You make for an incredible friend, as you are loyal and stable. If being reserved is a personality trait, then you should embrace it with pride! But if it hides shyness or lack of confidence then you should look at our recommendations.',
      },
      {
        condition: {
          'personType.romantic': true,
        },
        sentence: 'You connect with life primarily with feelings rather than logic.',
      },
      {
        condition: {
          'personType.sensitive': true,
          'personType.reserved': true,
          'personType.shy': true,
          'biggestChallenges.notHappyWithSocialLife': true,
        },
        sentence: 'You are shy and sensitive. You may be a Highly Sensitive Person ( HSP). This may encourage retreating from events or gatherings.',
      },
      {
        condition: {
          'personType.humorous': true,
          'personType.sociable': true,
          'biggestChallenges.endUpInFriendZone': false,
          'biggestChallenges.confidenceIssues': false,
        },
        sentence: 'Your outgoing personality is one of your strong points.',
      },
      {
        condition: {
          'personType.humorous': true,
          'personType.sociable': true,
          'biggestChallenges.endUpInFriendZone': true,
          'biggestChallenges.confidenceIssues': false,
        },
        sentence: 'You are sociable and humorous. Careful not to overuse instead of bringing out the erotic you.',
      },
      {
        condition: {
          'personType.humorous': true,
          'personType.sociable': true,
          'biggestChallenges.confidenceIssues': true,
        },
        sentence: 'You have an outgoing personality. You may tend to be a people pleaser.',
      },
      {
        condition: {
          'personType.ambitious': true,
          'personType.sociable': true,
          'biggestChallenges.busyToDate': true,
        },
        sentence: 'You know how to achieve targets but may forget to live in the moment.',
      },
      {
        condition: {
          'personType.adventurous': true,
          'personType.independent': true,
        },
        sentence: 'You like to try new experiences and to push yourself out of your comfort zone. You place high value on independence.',
      },
      {
        condition: {
          'personType.adventurous': true,
          'personType.independent': false,
        },
        sentence: 'You like to try new experiences and to push yourself out of your comfort zone.',
      },
      {
        condition: {
          'mateType.adventurous': true,
          OR: [{ 'mateType.reserved': true }, { 'mateType.prudent': true }],
        },
        sentence: 'You want to break out of your “box”.',
      },
      {
        condition: {
          'personType.ambitious': false,
          'personType.passionate': true,
        },
        sentence: 'You don’t call yourself ambitious but you will be once you find your true calling. Check our links.',
      },
      {
        condition: {
          'personType.ambitious': true,
          'personType.passionate': true,
          OR: [{ 'personType.shy': false }, { 'personType.sensitive': false }],
        },
        sentence: 'You are growth oriented and not afraid to get out of your comfort zone. These are attractive traits.',
      },
      {
        condition: {
          'personType.ambitious': true,
          'personType.passionate': true,
          OR: [{ 'personType.shy': true }, { 'personType.sensitive': true }],
        },
        sentence: 'You are persistent and don’t mind difficulties as long as you develop.',
      },
      {
        condition: {
          'personType.ambitious': true,
          'biggestChallenges.notHappyWithSocialLife': true,
        },
        sentence:
          'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group.',
      },
      {
        condition: {
          'personType.ambitious': true,
          'biggestChallenges.notHappyWithSocialLife': false,
        },
        sentence:
          'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group. To beat your lack of time choose activities that are easy to join.',
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
          type: SentenceType.USER_INTRODUCTION,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.USER_INTRODUCTION,
        },
      });
    }
  }
}
