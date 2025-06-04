import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../utils/constants.utils';
import { Prisma } from '@prisma/client';

export async function userMiddleware(params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => any) {
  if (((params.model === Prisma.ModelName.User|| params.model === Prisma.ModelName.Admin)  && params.args?.data) || params.args?.where) {
    const data = params.args.data;
    if (data?.email) {
      data.email = data.email.toLowerCase();
    }
    if (data?.password) {
      data.password = await bcrypt.hash(data.password, SALT_ROUND);
    }

    if (params.args.where?.email) {
      params.args.where.email = params.args.where.email.toLowerCase();
    }
  }

  const result = await next(params);

  return result;
}
