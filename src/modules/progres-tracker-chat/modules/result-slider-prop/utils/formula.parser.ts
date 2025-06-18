import { BadRequestException } from '@nestjs/common';

const parseFormula = (formula: string, variables: string[]): string[] => {
  const escapedOperators = MATH_OPERATORS.map(op => '\\' + op).join('|');
  const regex = new RegExp(`(${escapedOperators})`, 'g');

  return formula.split(regex).filter(part => part.trim() !== '').map(item => item.trim());
};

const calculate = (firstNumber: number, operator: string, secondNumber: number) => {
  if (!firstNumber) {
    return secondNumber;
  }
  switch (operator) {
    case '+':
      return firstNumber + secondNumber;
    case '-':
      return firstNumber - secondNumber;
    case '*':
      return firstNumber * secondNumber;
    case '/':
      return firstNumber / secondNumber;
    case '^':
      return Math.pow(firstNumber, secondNumber);
    default:
      throw new BadRequestException('Failed to calculate value');
  }
};
export const calculateVariable = (formula: string, variables: Record<string, number>) => {
  const parsedFormula = parseFormula(formula, Object.keys(variables))
  const stack: number[] = [];
  const opStack: string[] = [];

  const applyOp = () => {
    const b = stack.pop();
    const a = stack.pop();
    const op = opStack.pop();
    if (a === undefined || b === undefined || op === undefined) {
      throw new BadRequestException('Invalid formula');
    }
    stack.push(calculate(a, op, b));
  };

  for (const part of parsedFormula) {
    if (part === '(') {
      opStack.push(part);
    } else if (part === ')') {
      while (opStack.length && opStack[opStack.length - 1] !== '(') {
        applyOp();
      }
      if (opStack.length === 0) {
        throw new BadRequestException('Mismatched parentheses');
      }
      opStack.pop();
    } else if (MATH_OPERATORS.includes(part)) {
      while (
        opStack.length &&
        MATH_OPERATORS.indexOf(opStack[opStack.length - 1]) >= 0 &&
        opStack[opStack.length - 1] !== '('
        ) {
        applyOp();
      }
      opStack.push(part);
    } else if (Object.keys(variables).includes(part)) {
      stack.push(Number(variables[part]));
    } else {
      stack.push(Number(part));
    }
  }

  while (opStack.length) {
    if (opStack[opStack.length - 1] === '(' || opStack[opStack.length - 1] === ')') {
      throw new BadRequestException('Mismatched parentheses');
    }
    applyOp();
  }

  if (stack.length !== 1) {
    throw new BadRequestException('Invalid formula');
  }
  return stack[0];
};

export const MATH_OPERATORS = ['+', '-', '*', '/', '^', '(', ')'];
