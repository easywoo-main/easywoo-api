import { PrismaClient, SentenceType } from '@prisma/client';
import { Condition } from '../../../src/modules/report/modules/evaluator/condition.dto';
import { Seeder } from '../main/seeder.interface';

export class FinalConsiderationSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const sentences: {
      condition: Condition;
      sentence: string;
    }[] = [
      {
        sentence:
          'Your belief that you are too “old” to get what you want or find your ideal partner, can cause you to lose hope and become demotivated.\n' +
          'Don’t let your fears and limiting beliefs overwhelm you.\n' +
          'Our belief system plays a major role on how we perceive ourselves and consequently how others perceive us. Thus, when your limiting beliefs are tied up with something you cannot change, in this instance your age, you can end up feeling powerless.\n' +
          'This ultimately creates an emotional paralysis that can kill your motivation and your drive to conquer life.\n' +
          'The most common limiting beliefs that keep us stuck and block us from creating what we desire are:\n' +
          'All the good ones are taken.\n' +
          "I am past the age of finding a good match. I'll end up all alone.\n" +
          'I’m not good enough.”\n' +
          'Don’t allow them to interfere with your life.',
        condition: {
          GTE: { 'self_improvement.time_management': 15 },
        },
      },
      {
        sentence:
          'You state that you are ready for a serious relationship, however it seems that you are too focused on the sexual part. Of course, sex is a very important aspect of a relationship, however it needs to be balanced out with other equally important aspects, such as personality traits, intimacy, values and a common vision of life. If during a date you overly focus on the sexual aspect of your interaction, you may set the wrong tone and therefore hinder your chances of creating a meaningful relationship.',
        condition: {
          GTE: { 'self_improvement.sexuality_problems': 15 },
          'relationshipStatus.commitedRelationship': true,
        },
      },
      {
        sentence:
          'You mention that your online dates do not lead anywhere. If first dates are mostly what you get, maybe you should take a better look within and focus on how you present yourself on these dates. Do you see yourself being too needy? Too cool? Too different from how you present yourself on the screen? Maybe you sell someone that you are not and the other person is disappointed with the reality. The most important aspect is to identify what is your unique selling point as a potential partner and highlight that both through the screen and also on your first date. The key here is to be authentic in presenting the best version of yourself! If you do not know what your unique selling points are, check out our related links on the matter.',
        condition: {
          GTE: { 'awareness_objectives.no_follow': 15 },
        },
      },
      {
        sentence:
          'It seems that you are not using social media as well as you could be. Social platforms can provide a major opportunity to get yourself exposed to possible mates. If used properly it can become a great ally of yours. Think of it as a means to expose not only your physical attributes, but also to give others a glimpse of your interests and the type of life you lead.',
        condition: {
          GTE: { 'opportunity.wrong_use_SM': 15 },
        },
      },
      {
        sentence:
          'You feel that you do not have enough time to date.\n' +
          ' Actually, there is reality to the idea of being too busy to date. It often turns out that the time we are trying to establish our career and identity is the same time that we are supposed to be looking for a mate.\n' +
          ' Alternatively, we may be having other commitments such as a child, or family issues etc., that do not allow time for a relationship.\n' +
          ' The question is how important it is for you to find a mate now?\n' +
          'A key factor in time management is accepting that sometimes we have equally important phases in our lives, each demanding to be our top priority.\n' +
          'So, if you recognize that dating needs to be an integral part of your life in order to feel fulfilled, then you may need to compromise with the expectations that you have of yourself. Can you partly fulfill whatever is demanding your time? Can you bare to not have expectations of giving your best self in every important part of your life? We believe that the links in our care plan will be useful to you.',
        condition: {
          GTE: { 'self_improvement.time_management': 15 },
        },
      },
      {
        sentence:
          'Financial instability can be a major pain point. Even though it is not directly related to dating, feeling financially unstable can have a negative effect on many different levels. Are you at a very “tight” corner at the moment ? Or could the case be that your financial status at present does not allow you to fulfil your dreams, even though your finances are not as dire? In order to start working towards this pain point you firstly need to understand what does financial stability mean for you. Where do you want to reach to feel comfortable and how can you reach it?\n' +
          'In what ways does your financial status define the type of mate you are and what you can offer in a relationship?\n' +
          'The links below will surely help you clarify your thoughts and feelings on this matter.',
        condition: {
          GTE: { 'other.financial_instability': 15 },
        },
      },
      {
        sentence:
          'You are looking to further your career. This move could be a major source of confidence as it can redefine the way you see yourself and the way you are perceived by others, in turn giving a boost to your dating path. Of course, there may be a downside to this, in terms of time management and prioritising your current needs.',
        condition: {
          GTE: { 'other.further_career': 15 },
        },
      },
      {
        sentence:
          'Feeling that you are running out of time to start a family may cause desperation, anxiety or even depression. This state of despair can result in rash or extreme behaviours and settling for less than you deserve. For example, this may lead to you choosing the wrong partner simply because they may be available immediately. Or, your anxiety and desperation may be projected in a manner that makes you seem unattractive as a romantic option.\n' +
          'Finding a suitable mate and entering into a committed relationship requires time to get to know your mate, on every level. The feeling you may have now may be alleviated by simply freezing your eggs, which will buy you time. If for whatever reason, this is not an option, then you can also consider the possibility of focusing on a fulfilling relationship rather than child rearing. This is a subject that a professional coach or therapist can help you with.',
        condition: {
          GTE: { 'other.fertility_issues': 15 },
          'gender.female': true,
        },
      },
      {
        sentence:
          'Living with your parents may not allow you to mingle with people the way you want to. Are the reasons that you are still living with them purely financial or are there psychological, cultural or social factors that also play a role? \n' +
          'Psychological factors might be anxiety, fear and attachment issues.\n' +
          'Cultural or social factors might be your ethnic, religious or social background and upbringing which may not allow you to move out in the present. \n' +
          'Look at our recommendations based on the factors that apply to your case.',
        condition: {
          GTE: { 'other.living_with_parents': 15 },
        },
      },
      {
        sentence: '',
        condition: {},
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
          type: SentenceType.FINAL_CONSIDERATIONS,
        },
        create: {
          condition: sentenceEntity.condition,
          sentence: sentenceEntity.sentence,
          type: SentenceType.FINAL_CONSIDERATIONS,
        },
      });
    }
  }
}
