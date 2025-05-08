import { PrismaClient, SentenceType } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';

export class DeepDiveSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        sentence:
          'You seem to lack a healthy self esteem and do not have a positive attitude towards yourself. You need to develop both in order to attract your ideal match. Check our recommendations.',
        condition: { 'biggestChallenges.confidenceIssues': true },
      },
      {
        sentence:
          'Based on our assessment, it seems you have difficulties in the area of communication. Communication is a language that can be mastered. However, we suggest you also look at your confidence levels.',
        condition: {
          AND: {
            GTE: {
              'self_improvement.communication_problems': 15,
            },
            'mateRelationship.casual': false,
            'mateRelationship.committed': false,
            'mateRelationship.sexual': false,
            'mateRelationship.situationship': false,
            'mateRelationship.friendship': true,
          },
        },
      },
      {
        sentence:
          'Based on our assessment, it seems you have difficulties in the area of communication. Communication is a language that can be mastered. However, we suggest you also look at your confidence levels.',
        condition: {
          NOT: {
            AND: {
              GTE: {
                'self_improvement.communication_problems': 15,
              },
              'mateRelationship.casual': false,
              'mateRelationship.committed': false,
              'mateRelationship.sexual': false,
              'mateRelationship.situationship': false,
              'mateRelationship.friendship': true,
            },
          },
        },
      },
      {
        sentence:
          'You mention you are not completely satisfied with your appearance. Don’t forget the way we see ourselves will also affect the way we are perceived by others. We suggest that you enhance your strong points in order to balance your weak points, and at the same time really work on accepting and loving yourself inside and out. If however, there are things that you cannot come to terms with, maybe a professional can be of some help. Check our index.',
        condition: {
          GTE: { 'self_improvement.appearance_issues': 15 },
        },
      },
      {
        sentence:
          'Your weight seems to cause you some concern. Weight management can be a difficult pain point to address, however it is one that can be resolved. Firstly though, you need to ensure that you properly address the following points:' +
          'Can you truly imagine yourself being the weight and shape you want?' +
          'Do your current circumstances allow you to focus on this goal?' +
          'Do you need to firstly deal with previous disappointing experiences?' +
          'Are you willing to make changes in your lifestyle?' +
          'Are the end goals and time frame that you set for them achievable?' +
          'Look at our care plans on material that can help you answer the above questions.',
        condition: {
          GTE: { 'self_improvement.weight_issues': 15 },
        },
      },
      {
        sentence:
          'You seem to be having some difficulty in finding people with similar interests to yourself. Take advantage of the social groups we recommend based on your profile and start communicating with more people. However, should you feel this difficulty overwhelms you maybe you should reach deeper in yourself to find the answers. Look at our care plan.',
        condition: {
          GTE: { 'self_improvement.loneliness_stress_motivation': 15 },
        },
      },
      {
        sentence:
          'Coming out is a process of understanding, accepting, and valuing your sexual orientation/ identity. Although coming out can be difficult, it can also be a very liberating process.' +
          'However, you are to only person who can decide when, how and to who is safe to come out.' +
          'We recommend you seek the help of an experienced in LGBTQ+ matters therapist to guide you through the process. Also, watch our webinar on this subject and read the recommended books.',
        condition: {
          GTE: { 'sexuality_gay_bi.want_come_out': 15 },
          'sexual_orientation.straight': false,
        },
      },
      {
        sentence:
          'If you tend to develop crushes or infatuations with unavailable people, it could mean that subconsciously you are not ready to act upon your feelings. It may be time you started mixing with people of the same sexual orientation as you and give someone the chance to return your affections.',
        condition: {
          GTE: { 'sexuality_gay_bi.falling_straight_people': 15 },
          'sexual_orientation.straight': false,
        },
      },
      {
        sentence:
          'Entering a gay relationship can be daunting, especially at the beginning of coming out. To make this phase easier, make sure that:' +
          'You are both at the same stage of outness.' +
          'Have the same sexual preferences.' +
          'Same level of stability or commitment.' +
          'Also it’s good to be aware of minority stressors that can affect LGBDQ+ couples.' +
          'For further material on this, please refer to our links. For extra support check our links on suitable counselors or therapists.',
        condition: {
          GTE: { 'sexuality_gay_bi.scared_gay_date': 15 },
          'sexual_orientation.straight': false,
        },
      },
      {
        sentence:
          'The legal and social climate for LGBTQ+ people has a direct impact on how they form families and become parents.\n' +
          'You may need help in deciding how to go about this. Please follow the links for information on this subject.',
        condition: {
          GTE: { 'sexuality_gay_bi.start_family_gay_partner': 15 },
          'sexual_orientation.straight': false,
        },
      },
      {
        sentence:
          'Your sexuality is a primary factor to take into consideration when setting your dating objectives. If you have any unresolved issues surrounding your sexuality or to what extent you can allow yourself to come out, then it might be difficult for you to set your dating objectives clearly and honestly. Look at our care plan for useful advice on this subject.',
        condition: {
          GTE: { 'opportunity.sexuality_lgbt': 15 },
          'sexual_orientation.straight': false,
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
          type: SentenceType.DEEP_DIVE,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.DEEP_DIVE,
        },
      });
    }
  }
}
