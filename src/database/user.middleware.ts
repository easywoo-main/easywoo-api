import * as bcrypt from 'bcrypt';
import { SALT_ROUND } from '../utils/constants.utils';

export async function userMiddleware(params, next) {
  if (params.model == 'User' && params?.args?.data) {
    const data = params.args.data;
    if (data?.email) {
      data.email = data.email.toLowerCase();
    }
    if (data?.password) {
      data.password = await bcrypt.hash(data.password, SALT_ROUND);
    }
  }

  const result = await next(params);

  if (params?.model === 'User' && params?.args?.select?.password !== true) {
    if (Array.isArray(result)) {
      result?.forEach((user) => {
        delete user?.password;
      });
    } else {
      delete result?.password;
    }
  }

  return result;
}
