import * as Joi from 'joi';

export const envSchema = Joi.object({
  // ---------- SERVER ----------
  PORT: Joi.number().default(8080),
  BASE_URL: Joi.string().uri().required(),

  // ---------- DATABASE ----------
  DATABASE_HOST: Joi.string().hostname().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required(),

  // ---------- JWT ----------
  JWT_SECRET_KEY: Joi.string().min(10).required(),
  ACCESS_TOKEN_EXPIRE: Joi.string().pattern(/^\d+[smhd]$/).default('1h'),
  REFRESH_TOKEN_EXPIRE: Joi.string().pattern(/^\d+[smhd]$/).default('90d'),

  // ---------- GOOGLE ----------
  GOOGLE_CLIENT_ID: Joi.string().required(),

  // ---------- APPLE ----------
  APPLE_CLIENT_ID: Joi.string().required(),
  APPLE_TEAM_ID: Joi.string().required(),
  APPLE_KEY_ID: Joi.string().required(),
  APPLE_CALLBACK_URL: Joi.string().uri().required(),

  // ---------- RevenueCat ----------
  SUBSCRIPTION_WEBHOOK_TOKEN: Joi.string().required(),

  // ---------- EASYWOO API ----------
  EASYWOO_API: Joi.string().uri().required(),
});
