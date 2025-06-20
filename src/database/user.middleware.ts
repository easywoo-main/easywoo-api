import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../utils/constants.utils';
import { Prisma } from '@prisma/client';

export async function userMiddleware(params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => unknown) {
  if (((params.model === Prisma.ModelName.User || params.model === Prisma.ModelName.Admin) && params.args?.data) || params.args?.where) {
    const data = params.args.data || params.args.create || params.args.update;
    if (data?.email) {
      data.email = data.email.toLowerCase();
    }

    if (data?.password) {
      console.log("admin:name: ", data?.userName)
      data.password = await bcrypt.hash(data.password, SALT_ROUND);
      console.log(params.args.data || params.args.create || params.args.update)

    }

    if (params.args.where?.email) {
      params.args.where.email = params.args.where.email.toLowerCase();
    }
  }
  console.log(params)
  return await next(params);
}
