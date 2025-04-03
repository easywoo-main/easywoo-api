import { SentenceType } from '@prisma/client';

const SALT_ROUND = 10;

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];


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
    name: 'What about the baggage?',
    type: SentenceType.EmotionalBaggage,
  },
  {
    name: 'EasySocial',
    type: SentenceType.EasySocial,
  },
  {
    name: 'Last but not least…',
    type: SentenceType.FinalConsiderations,
  },
];

export { SALT_ROUND, REPORT_SECTIONS, MAX_FILE_SIZE, ALLOWED_FILE_TYPES };
