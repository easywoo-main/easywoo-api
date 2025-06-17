import { Injectable } from '@nestjs/common';
import { Condition } from './condition.dto';

@Injectable()
export class EvaluatorService {

  public chekObj(value: any, obj: any): boolean {
    if (Array.isArray(value)) {
      return value.every((subCondition) => this.chekObj(subCondition, obj));
    } else {
      return Object.entries(value).every(([key, value]) => this.checkCondition(key, value, obj));
    }
  }

  public checkCondition(key: string, value: any, obj: any): boolean {
    if (key === 'AND') {
      return this.chekObj(value, obj);
    }

    if (key === 'OR') {
      if (Array.isArray(value)) {
        return value.some((subCondition) => this.chekObj(subCondition, obj));
      } else {
        return Object.entries(value).some(([key, value]) => this.checkCondition(key, value, obj));
      }
    }

    if (key === 'GTE') {
      return Object.entries(value).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue >= value;
      });
    }

    if (key === 'GT') {
      return Object.entries(value).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue > value;
      });
    }

    if (key === 'LTE') {
      return Object.entries(value).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue <= value;
      });
    }

    if (key === 'LT') {
      return Object.entries(value).every(([key, value]) => {
        const objValue = this.getValueByKey(key, obj);
        return objValue < value;
      });
    }

    return this.getValueByKey(key, obj) === value;

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
