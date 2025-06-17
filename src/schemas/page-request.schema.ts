import * as Joi from 'joi';

export const pageRequestSchema = Joi.object({
  pageNumber: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(1000).default(200),
  sortBy: Joi.object()
    .pattern(
      Joi.string(),
      Joi.string().valid('asc', 'desc')
    )
    .default({ id: 'desc' })
    .unknown(true),
  search: Joi.string().allow('').default(''),
}).unknown(true);
