import { Injectable } from '@nestjs/common';
import { Condition } from './condition.dto';

@Injectable()
export class EvaluatorService {
  public checkCondition(expression: Condition, data: any): boolean {
    console.log('expression', expression, data['personType']['romantic']);

    if (Array.isArray(expression)) {
      return expression.every((item) => this.checkCondition(item, data));
    }

    if (typeof expression === 'object') {
      const operator = Object.keys(expression)[0];

      if (operator === 'AND') {
        if (Array.isArray(expression['AND'])) {
          return expression['AND'].every((item) => this.checkCondition(item, data));
        }
        return Object.entries(expression['AND']).every(([key, value]) => this.checkNestedValue(key, value, data));
      }

      if (operator === 'OR') {
        if (Array.isArray(expression['OR'])) {
          return expression['OR'].some((item) => this.checkCondition(item, data));
        }
        return Object.entries(expression['OR']).some(([key, value]) => this.checkNestedValue(key, value, data));
      }

      if (operator === 'GTE') {
        const key = Object.keys(expression['GTE'])[0];
        return data[key] >= expression['GTE'][key];
      }

      if (operator === 'GT') {
        const key = Object.keys(expression['GT'])[0];
        return data[key] > expression['GT'][key];
      }

      if (operator === 'LTE') {
        const key = Object.keys(expression['LTE'])[0];
        return data[key] <= expression['LTE'][key];
      }

      if (operator === 'LT') {
        const key = Object.keys(expression['LT'])[0];
        return data[key] < expression['LT'][key];
      }

      if (operator === 'EQUALS') {
        const key = Object.keys(expression['EQUALS'])[0];
        return data[key] === expression['EQUALS'][key];
      }

      if (operator === 'IN') {
        const key = Object.keys(expression['IN'])[0];
        return Array.isArray(expression['IN']) && expression['IN'].includes(data[key]);
      }

      if (operator === 'NOTIN') {
        const key = Object.keys(expression['NOTIN'])[0];
        return Array.isArray(expression['NOTIN']) && !expression['NOTIN'].includes(data[key]);
      }

      const key = Object.keys(expression)[0];
      if (expression[key] !== undefined) {
        return this.checkNestedValue(key, expression[key], data);
      }
    }

    return false;
  }

  private checkNestedValue(key: string, value: any, data: any): boolean {
    const subKeys = key.split('.');
    let currentValue = data;

    for (const subKey of subKeys) {
      if (currentValue && currentValue[subKey] !== undefined) {
        currentValue = currentValue[subKey];
      } else {
        return false;
      }
    }

    return currentValue === value;
  }
}
