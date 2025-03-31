import { Injectable } from '@nestjs/common';
import { SentenceEntity } from '../sentence.entity';
import { JsonValue } from '@prisma/client/runtime/library';

@Injectable()
export class EvaluatorService {
  public checkCondition(condition: JsonValue, questionnaire): boolean {
    if (Array.isArray(condition)) {
      if (condition.some((cond) => cond['AND'] || cond['OR'])) {
        for (const subCondition of condition) {
          if (subCondition['AND']) {
            if (!this.checkCondition(subCondition['AND'], questionnaire)) {
              return false;
            }
          } else if (subCondition['OR']) {
            if (this.checkCondition(subCondition['OR'], questionnaire)) {
              return true;
            }
          } else {
            if (!this.checkSimpleCondition(subCondition, questionnaire)) {
              return false;
            }
          }
        }
        return true;
      }
      return condition.every((subCondition) => this.checkSimpleCondition(subCondition, questionnaire));
    }
    return this.checkSimpleCondition(condition, questionnaire);
  }

  private checkSimpleCondition(condition: any, questionnaire): boolean {
    const [key, value] = Object.entries(condition)[0];
    const keys = key.split('.');

    let obj = questionnaire;
    for (const k of keys) {
      if (obj[k] === undefined) {
        return false;
      }
      obj = obj[k];
    }

    return obj === value;
  }
}
