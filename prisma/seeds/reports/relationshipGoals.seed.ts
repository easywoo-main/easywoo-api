import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';
import { Seeder } from '../main/seeder.interface';

export class RelationshipGoalsSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      // {
      //  sentence: 'It seems that at this point in your life any kind of relationship is ok with you. Actually, this is not a bad place to be. As long as you feel comfortable being open to life’s possibilities. However, if you find that you are not clear as to what relationship you would like to be in at this stage in your life, do check out our clarifying suggestions in your care plan.' ,
      //   condition: {
      //    'mateRelationship.casual'
      //   }
      // }
      {
        sentence:
          'You will know if casual sex is emotionally healthy for you if it makes you feel good about yourself. There is no right or wrong here, just what kind of sexual life you want to live.',
        condition: {
          'mateRelationship.sexual': true,
        },
      },
      {
        sentence:
          'You may be at a stage in your life where getting experiences and living for the moment is what is called for ! As long as you are happy with it so are we!\n' +
          'It’s a good idea to read about casual dating rules in our care plan.\n' +
          'However, if any of the below apply to you:\n' +
          'You have a pattern of short-lived relationships and you are not happy about it.\n' +
          'You have given up on finding a serious relationship.\n' +
          'You consistently feel the need to end things when relationships start moving past the casual stage, even though you like the person.\n' +
          'Then this may indicate something more significant such as unresolved commitment issues. Look at our care plan.\n',
        condition: {
          'mateRelationship.casual': true,
        },
      },
      {
        sentence:
          "You are looking for situationships, which leads us to believe that your ideal relationship at the moment for your own reasons, is one that you want it to be undefined. That is, one where there is no talk about what's next, or considered becoming deeper.",
        condition: {
          'mateRelationship.situationship': true,
        },
      },
      {
        sentence:
          'Since you are looking to increase your dating opportunities, we will suggest venues and events that can help get you more exposed to possible mates and increase your dating opportunities. Additionally, we can help you get ready for a date by following our extensive list on dating tips.',
        condition: {
          GTE: { 'other.just_date': 15 },
        },
      },
      {
        sentence:
          'It seems that you are looking for friends or new people to hang out with. Developing and maintaining good friendships takes effort. You need time, energy and be willing to share yourself. On the practical side to meet new people who might become your friends, you have to develop certain strategies.\n' +
          'Let us see how to go about this:\n' +
          'Even though it may sound like a given, you need to go to places where others gather.\n' +
          'Persistence also matters. Take the initiative rather than waiting for invitations to come your way and keep trying. You may need to suggest plans a few times before you can tell if your interest in a new friend is mutual. So be mindful in respecting their cues. For tips on developing friendships follow our links.',
        condition: {
          GTE: { 'other.looking_friends': 15 },
        },
      },
      {
        sentence:
          'If your priority is to keep your sexual orientation “discreet”, you will need to take measures to ensure this which could make finding someone harder. We will of course ensure that you will be provided with all the support needed to make this path easier. Look at our links ( put links on longer version also)\n' +
          'If you ever consider coming out, we would advise you to follow our links or connect with a therapist specializing in issues relating to coming out.',
        condition: {
          GTE: { 'sexuality_gay_bi.want_gay_relationship_closet': 15 },
          'sexual_orientation.straight': false,
        },
      },
      {
        sentence:
          'You are in a straight relationship yet looking for same sex mate. You may just want a new experience or to experiment. If this a new phase for you, we can help you explore it.' +
          'Keep in mind that if you are in a monogamous relationship, you may need some help with how to handle this. From how to share this with your partner to how to deal with keeping this side of you to yourself. Check our links. You will find them helpful.',
        condition: {
          GTE: { 'sexuality_gay_bi.want_hetro_relation_gay_parallel': 15 },
          'sexual_orientation.straight': true,
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
          type: SentenceType.RELATIONSHIP_GOALS,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.RELATIONSHIP_GOALS,
        },
      });
    }
  }
}
