import { Sentence } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class SentenceEntity implements Sentence {
  id: string;
  sentence: string;
  condition: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}
