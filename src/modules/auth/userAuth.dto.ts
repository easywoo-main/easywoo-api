import { ApiProperty } from '@nestjs/swagger';
import {Tokens} from "../token/dtos/tokens.dto";
import {User} from "../user/user.entity";

export class UserAuthDto extends Tokens {
    @ApiProperty({ type: () => User })
    user: User;
}