import { Sentence, SentenceType } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class SentenceEntity implements Sentence {
  id: string;
  sentence: string;
  condition: JsonValue;
  dbFindManyArgs: JsonValue;
  type: SentenceType;
  createdAt: Date;
  updatedAt: Date;
}
