import * as Joi from 'joi';

export const userCreateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  appleUserId: Joi.string().allow(null).optional(),
  googleUserId: Joi.string().allow(null).optional(),
});