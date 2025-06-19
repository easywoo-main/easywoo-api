import * as Joi from 'joi';
import { pageRequestSchema } from '../../../schemas/page-request.schema';

export const chatFilterSchema = pageRequestSchema.keys({
  isDisabled: Joi.boolean().optional(),
});