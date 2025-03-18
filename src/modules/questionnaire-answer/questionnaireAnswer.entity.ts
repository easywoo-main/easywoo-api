import { QuestionnaireAnswer as QuestionnaireAnswerPrisma } from '@prisma/client';

export class QuestionnaireAnswer implements QuestionnaireAnswerPrisma {
  id: string;
  answer: string[];
  questionId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
