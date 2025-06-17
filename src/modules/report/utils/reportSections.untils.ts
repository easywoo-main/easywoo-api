import { SentenceType } from '@prisma/client';

export const REPORT_SECTIONS: {
  name: string;
  type: keyof typeof SentenceType,
  minimumNumberSentences: number,
  sentence: string
}[] = [
  {
    name: 'Let’s look at you',
    type: SentenceType.USER_INTRODUCTION,
    minimumNumberSentences: 1,
    sentence: 'It seems that you have not given us enough insight into your personality. We would love to get to know you better and give you some constructive feedback. Maybe you want to consider taking the questionnaire again and being more thorough in your answers. The more details you give us the higher the chances of us helping you.'
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.DEEP_DIVE,
    minimumNumberSentences: 2,
    sentence: 'It seems that at the moment you are not into searching deeper within your self. That’s ok by us.'
  },
  {
    name: 'Clearing up your relationship goals',
    type: SentenceType.TARGET_AUDIENCE,
    minimumNumberSentences: 1,
    sentence: ' It seems that you have not given us enough information on what kind of relationship you are looking for. If this is important to you, consider going back and retaking the questionnaire.'
  },
  {
    name: 'Who are you aiming to woo?',
    type: SentenceType.RELATIONSHIP_GOALS,
    minimumNumberSentences: 1,
    sentence: 'Not knowing who you would like to woo is ok. But if you give us some pointers by ticking more of the choices we are providing, it would enable us to give you feedback we are sure will help you.'
  },
  {
    name: 'What about the baggage?',
    type: SentenceType.EMOTIONAL_BAGGAGE,
    minimumNumberSentences: 1,
    sentence: ' It seems that you are not carrying any baggage. That’s fine. If this is not the case maybe you should consider re-taking the questionaire.'
  },
  {
    name: 'EasySocial',
    type: SentenceType.EASY_SOCIAL,
    minimumNumberSentences: 1,
    sentence: 'It seems that you have no issues concerning your social life. If this is not the case, please try to be more thorough when answering the questionnaire.',
  },
  {
    name: 'Last but not least…',
    type: SentenceType.FINAL_CONSIDERATIONS,
    minimumNumberSentences: 1,
    sentence: "This questionnaire works on all aspects of your life. If you find that you have not been covered and you wish to explore further, maybe you should give us more details.",
  }
];
