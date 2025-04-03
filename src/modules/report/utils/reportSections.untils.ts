import { SentenceType } from '@prisma/client';

export const REPORT_SECTIONS: {name: string, type: keyof typeof SentenceType}[] = [
  {
    name: 'Let’s look at you',
    type: SentenceType.USER_INTRODUCTION,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.DEEP_DIVE,
  },
  {
    name: 'Who are you aiming to woo?',
    type: SentenceType.TARGET_AUDIENCE,
  },
  {
    name: 'Clearing up your relationship goals',
    type: SentenceType.RELATIONSHIP_GOALS,
  },
  {
    name: 'What about the baggage?',
    type: SentenceType.EMOTIONAL_BAGGAGE,
  },
  {
    name: 'EasySocial',
    type: SentenceType.EASY_SOCIAL,
  },
  {
    name: 'Last but not least…',
    type: SentenceType.FINAL_CONSIDERATIONS,
  },
];