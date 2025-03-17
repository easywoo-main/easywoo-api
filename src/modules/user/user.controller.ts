import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { AuthGuard } from '../../guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  public async getMe(@UserDetails() user: UserPayload) {
    return await this.userService.findUserById(user.id);
  }

  @Put('me')
  @UseGuards(AuthGuard)
  public async updateMe(@UserDetails() user: UserPayload, @Body() userDto: UserUpdateDto) {
    return await this.userService.updateUser(user.id, userDto);
  }
}
