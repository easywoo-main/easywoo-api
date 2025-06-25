import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from '../../decorators';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { AuthGuard } from '../../guard';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { PasswordResetGuard } from '../../guard/passwordReset.guard';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';
import { ResetPassword } from './dto/resetPassword.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User details', type: UserEntity })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorResponse })
  public async getMe(@UserDetails() user: UserPayload) {
    return await this.userService.findUserById(user.id);
  }

  @Patch('me')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User updated successfully', type: UserEntity })
  @UseGuards(AuthGuard)
  public async updateMe(@UserDetails() user: UserPayload, @Body() userDto: UserUpdateDto) {
    return await this.userService.updateUser(user.id, userDto);
  }

  @Patch('/reset-password')
  @UseGuards(PasswordResetGuard)
  public async updatePassword(@UserDetails() user: PasswordResetPayload, @Body() resetPassword: ResetPassword){
    return await this.userService.updateUser(user.id, resetPassword);
  }
}
