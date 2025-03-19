import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { AuthGuard } from '../../guards';
import {ApiOkResponse, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {User} from "./user.entity";
import {ErrorResponse} from "../../errorHandler/errorResponse.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'User details', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  public async getMe(@UserDetails() user: UserPayload) {
    return await this.userService.findUserById(user.id);
  }

  @Put('me')
  @UseGuards(AuthGuard)
  public async updateMe(@UserDetails() user: UserPayload, @Body() userDto: UserUpdateDto) {
    return await this.userService.updateUser(user.id, userDto);
  }
}
