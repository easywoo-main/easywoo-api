import { SentenceType } from '@prisma/client';

const SALT_ROUND = 10;

const REPORT_SECTIONS = [
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.UserIntroduction,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.DeepDive,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.TargetAudience,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.RelationshipGoals,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.FinalConsiderations,
  },
  {
    name: 'Scratching beneath the surface',
    type: SentenceType.EmotionalBaggage,
  },
];

export { SALT_ROUND, REPORT_SECTIONS };
