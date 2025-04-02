import { SentenceType } from '@prisma/client';

const SALT_ROUND = 10;

const REPORT_SECTIONS = [
  {
    name: 'Let’s look at you',
    type: SentenceType.UserIntroduction,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.DeepDive,
  },
  {
    name: 'Who are you aiming to woo?',
    type: SentenceType.TargetAudience,
  },
  {
    name: 'Clearing up your relationship goals',
    type: SentenceType.RelationshipGoals,
  },
  {
    name: 'Last but not least…',
    type: SentenceType.FinalConsiderations,
  },
  {
    name: "EasySocial",
    type: SentenceType.EasySocial
  },
  {
    name: 'What about the baggage?',
    type: SentenceType.EmotionalBaggage,
  },
];

export { SALT_ROUND, REPORT_SECTIONS };
