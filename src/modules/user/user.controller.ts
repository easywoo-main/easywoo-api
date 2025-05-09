import { Body, Controller, Get, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { AuthGuard } from '../../guard';
import { PageRequestArgs } from '../../utils/pageable.utils';

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

  @Get("/chat/:chatId")
  @ApiBearerAuth()
  public async getAllUser(@Param("chatId") chatId: string, @Query() pageRequestArgs: PageRequestArgs){
    return this.userService.getAllUser(chatId, pageRequestArgs)
  }
}
