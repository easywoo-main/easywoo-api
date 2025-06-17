import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';
import { Seeder } from '../main/seeder.interface';

export class EasySocialSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        sentence:
          "Not having a social life that fulfills one's particular needs can cause loneliness which in turn can be stressful, disheartening and a source of unhappiness. Where do your difficulties lie? Is it because of your current circumstances or is it something that you have always found yourself in? If this is something that you usually find yourself in, maybe you should be answering the following questions:\n" +
          'Do you often feel that you are surrounded by people that do not fit your needs?\n' +
          "Do you often feel that people around you don't seem to get you?\n" +
          'Do you often find your feelings being hurt by others?\n' +
          'Do you often find yourself surrounded by people that do not inspire you?\n' +
          'We understand how difficult these situations are to combat. We can also assess that these difficulties have nothing to do with your personality or your interests, as you seem to be a highly intellectual and interesting person. The problem seems to lie in the way that you associate yourself with others and your level of acceptance of the shortcomings of the people you come in contact with. However difficult it is to swallow, the reality is that we cannot change others! We can only help ourselves to conquer difficult situations. Regardless of how \\"compromising\\" this may sound, the answer lies in balancing our authentic self, which may include attributes such as being specific, strict, intolerant or judgmental, with the part of us that needs to be a social being.\n' +
          "Therefore, being more accepting of people's limitations however challenging this may be, and managing to get whatever we can get out of each relationship, it is the key to slowly start building social tolerance, perseverance and flexibility. This does not include allowing or accepting toxic relationships, as this can only cause emotional distress. It is all about ascertaining who to keep in and who to keep out; healthy boundaries.",
        condition: {
          AND: [
            { GTE: { 'opportunity.no_social_life': 15 } },
            {
              OR: {
                'biggestChallenges.communicationProblems': true,
                'biggestChallenges.shy': true,
              },
            },
            {
              'personType.wellReadIntellectual': true,
              'personType.reserved': true,
            },
            {
              OR: {
                'personType.humorous': false,
                'personType.passionate': false,
              },
            },
          ],
        },
      },
      {
        sentence:
          'You mention that your social life may need improvement. \n' +
          'If you feel that your social life is limited at the moment because of a change in your current circumstances, follow our practical advice and links. \n' +
          "If the difficulties lie in the fact that people that you associate with are on a different path to your own, don't allow this to deter you from moving towards your own path. Let us help you establish new connections based on your current interests and needs, without the fear of missing out. \n" +
          "However, should this be a situation that you have always found yourself in then maybe you have difficulty venturing outside your comfort zone.  Take a look at our recommendations on how to start your journey to a new lifestyle outside your norm. We can recommend new interests and new groups that can intrigue you and maybe in due time establish a new close circle of 'going out friends'",
        condition: {
          GTE: { 'opportunity.no_social_life': 15 },
          'biggestChallenges.communicationProblems': false,
          'biggestChallenges.shy': false,
        },
      },
      {
        sentence:
          "Not having a social life that fulfills one's particular needs can cause loneliness which in turn can be stressful, disheartening and a source of unhappiness. Where does your difficulty lie? Is it because of your current circumstances or is it something that you have always found yourself in? Although you seem to be an amicable character, you find it hard to assert yourself in social situations.\n" +
          'How do you see yourself in relation to the people around you?\n' +
          "Do you find it difficult to converse freely with others? Are you lacking conversation material? Do you trust yourself to speak your mind? If the problem lies in your own difficulty to connect or not having enough social skills to do so, don't worry. We can help you in this practically through our links, although it may be a good idea to explore this notion further.",
        condition: {
          GTE: { 'opportunity.no_social_life': 15 },
          'biggestChallenges.notHappyWithSocialLife': true,
          'personType.shy': true,
          'personType.communicationProblems': true,
        },
      },
      {
        sentence: '',
        condition: {
          GTE: { 'opportunity.mate_hungs_out': 15 },
          'biggestChallenges.notHappyWithSocialLife': true,
          'personType.shy': false,
          'personType.communicationProblems': false,
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
