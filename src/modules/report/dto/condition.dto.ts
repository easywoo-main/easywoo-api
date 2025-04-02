export class Condition {
  AND?: Condition[] | Record<string, any>;
  OR?: Condition[] | Record<string, any>;
  GTE?: Record<string, any>;
  GT?: Record<string, any>;
  LTE?: Record<string, any>;
  LT?: Record<string, any>;
  EQUALS?: Record<string, any>;
  IN?: any[];
  NOTIN?: any[];
  [key: string]: any;
}
