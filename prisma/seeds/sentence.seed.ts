import { PrismaClient } from '@prisma/client';

async function main(prisma: PrismaClient) {
  const sentences = [
    {
      condition: {
        AND: [{ 'personType.sensitive': true }],
      },
      result: 'You are a sensitive person and can be emotional, especially when in a relationship. Be careful you don’t get too intense.',
    },
    {
      condition: {
        AND: [{ 'personType.reserved': true }, { OR: [{ 'personType.humorous': true }, { 'personType.sociable': true }] }],
      },
      result: 'You tend to be reserved. If this is because of shyness or lack of confidence check our recommendations.',
    },
    {
      condition: {
        AND: [{ 'personType.reserved': true }, { 'personType.sociable': true }],
      },
      result:
        'You tend to be rather self-aware. You have a need for lots of time alone, does this allow you to socialise enough? You take more time thinking than acting. You make for an incredible friend, as you are loyal and stable. If being reserved is a personality trait, then you should embrace it with pride! But if it hides shyness or lack of confidence then you should look at our recommendations.',
    },
    {
      condition: {
        AND: [{ 'personType.romantic': true }],
      },
      result: 'You connect with life primarily with feelings rather than logic.',
    },
    {
      condition: {
        AND: [{ 'personType.sensitive': true }, { 'personType.reserved': true }, { 'personType.shy': true }, { 'biggestChallenges.notHappyWithSocialLife': true }],
      },
      result: 'You are shy and sensitive. You may be a Highly Sensitive Person ( HSP). This may encourage retreating from events or gatherings.',
    },
    {
      condition: {
        AND: [{ 'personType.humorous': true }, { 'personType.sociable': true }, { 'biggestChallenges.endUpInFriendZone': false }, { 'biggestChallenges.confidenceIssues': false }],
      },
      result: 'Your outgoing personality is one of your strong points.',
    },
    {
      condition: {
        AND: [{ 'personType.humorous': true }, { 'personType.sociable': true }, { 'biggestChallenges.endUpInFriendZone': true }, { 'biggestChallenges.confidenceIssues': false }],
      },
      result: 'You are sociable and humorous. Careful not to overuse instead of bringing out the erotic you.',
    },
    {
      condition: {
        AND: [{ 'personType.humorous': true }, { 'personType.sociable': true }, { 'biggestChallenges.confidenceIssues': true }],
      },
      result: 'You have an outgoing personality. You may tend to be a people pleaser.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': true }, { 'personType.sociable': true }, { 'biggestChallenges.busyToDate': true }],
      },
      result: 'You know how to achieve targets but may forget to live in the moment.',
    },
    {
      condition: {
        AND: [{ 'personType.adventurous': true }, { 'personType.independent': true }],
      },
      result: 'You like to try new experiences and to push yourself out of your comfort zone. You place high value on independence.',
    },
    {
      condition: {
        AND: [{ 'personType.adventurous': true }, { 'personType.independent': false }],
      },
      result: 'You like to try new experiences and to push yourself out of your comfort zone.',
    },
    {
      condition: {
        AND: [{ 'mateType.adventurous': true }, { OR: [{ 'mateType.reserved': true }, { 'mateType.prudent': true }] }],
      },
      result: 'You want to break out of your “box”.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': false }, { 'personType.passionate': true }],
      },
      result: 'You don’t call yourself ambitious but you will be once you find your true calling. Check our links.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': true }, { 'personType.passionate': true }, { OR: [{ 'personType.shy': false }, { 'personType.sensitive': false }] }],
      },
      result: 'You are growth oriented and not afraid to get out of your comfort zone. These are attractive traits.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': true }, { 'personType.passionate': true }, { OR: [{ 'personType.shy': true }, { 'personType.sensitive': true }] }],
      },
      result: 'You are persistent and don’t mind difficulties as long as you develop.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': true }, { 'biggestChallenges.notHappyWithSocialLife': true }],
      },
      result:
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group.',
    },
    {
      condition: {
        AND: [{ 'personType.ambitious': true }, { 'biggestChallenges.notHappyWithSocialLife': false }],
      },
      result:
        'You like to be surrounded by successful people in the areas of success that matter to you. Try to get socially involved with what you are good at e.g: job, hobby or social group. To beat your lack of time choose activities that are easy to join.',
    },
  ];

  for (const sentenceEntity of sentences) {
    await prisma.sentence.create({
      data: { sentenceEntity },
    });
  }
}

export { main as sentenceSeed };
