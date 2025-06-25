import { Controller, Post, Body, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { SendResetPasswordEmailDto } from './dtos/send-reset-password-email.dto';
import { PasswordResetDto } from './dtos/reset-password.dto';
import { Success } from '../../utils/success.utils';
import { AccessToken } from '../token/dtos/accessToken.dto';
import { PasswordResetGuard } from '../../guard/passwordReset.guard';
import { UserDetails } from '../../decorators';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';
import { ResetPassword } from '../user/dto/resetPassword.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  // Send reset password email
  @Post('send-email')
  public async sendResetEmail(
    @Body() dto: SendResetPasswordEmailDto
  ): Promise<Success> {
    return this.passwordResetService.sendResetEmail(dto);
  }

  // Verify code and get access token
  // @Post('verify-code')
  // public async verifyCode(
  //   @Body() dto: PasswordResetDto
  // ): Promise<AccessToken> {
  //   return this.passwordResetService.verifyCode(dto);
  // }

  // Delete reset password entry by id
  // @Delete(':id')
  // public async deleteResetPassword(
  //   @Param('id') id: string
  // ) {
  //   return this.passwordResetService.deleteResetPassword(id);
  // }


  @Patch('/reset-password')
  @UseGuards(PasswordResetGuard)
  public async updatePassword(@UserDetails() passwordResetPayload: PasswordResetPayload, @Body() resetPassword: ResetPassword){
    return await this.passwordResetService.updateUserPassword(passwordResetPayload.resetPasswordId, resetPassword);
  }
}