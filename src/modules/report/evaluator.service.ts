import { Injectable } from '@nestjs/common';
import { Condition } from './dto/condition.dto';

@Injectable()
export class EvaluatorService {
  public checkCondition(condition: Condition, obj: any): boolean {
    if (condition.AND) {
      if (Array.isArray(condition.AND)) {
        return condition.AND.every((subCondition) => this.checkCondition(subCondition, obj));
      } else {
        return Object.entries(condition.AND).every(([key, value]) => this.checkConditionForKey(key, value, obj));
      }
    }

    if (condition.OR) {
      if (Array.isArray(condition.OR)) {
        return condition.OR.some((subCondition) => this.checkCondition(subCondition, obj));
      } else {
        return Object.entries(condition.OR).some(([key, value]) => this.checkConditionForKey(key, value, obj));
      }
    }

    if (condition.GTE) {
      console.log('condition.GTE', condition.GTE);

      return Object.entries(condition.GTE).every(([key, value]) => {
        console.log('key', key);
        const objValue = this.getValueByKey(key, obj);
        return objValue >= value;
      });
    }

    if (condition.GT) {
      return Object.entries(condition.GT).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue > value;
      });
    }

    if (condition.LTE) {
      return Object.entries(condition.LTE).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue <= value;
      });
    }

    if (condition.LT) {
      return Object.entries(condition.LT).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue < value;
      });
    }

    if (condition.EQUALS) {
      return Object.entries(condition.EQUALS).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue === value;
      });
    }

    if (condition.IN) {
      return condition.IN.includes(this.getValueByKey(Object.keys(condition)[0], obj));
    }

    if (condition.NOTIN) {
      return !condition.NOTIN.includes(this.getValueByKey(Object.keys(condition)[0], obj));
    }

    if (Object.keys(condition).length > 0) {
      return Object.entries(condition).every(([key, value]) => this.checkConditionForKey(key, value, obj));
    }

    return true;
  }

  public checkConditionForKey(key: string, value: any, obj: any): boolean {
    const keys = key.split('.');
    let currentValue = obj;

    for (const k of keys) {
      if (currentValue && currentValue[k] !== undefined) {
        currentValue = currentValue[k];
      } else {
        return false; // Якщо значення не знайдено
      }
    }

    return currentValue === value;
  }

  private getValueByKey(key: string, obj: any): any {
    const keys = key.split('.');
    let value = obj;

    for (const k of keys) {
      value = value ? value[k] : undefined;
    }

    return value;
  }
}
