import { PassportSerializer } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { UserService } from '../../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.findUserById(payload.id);
    return user ? done(null, user) : done(null, null)
  }
}