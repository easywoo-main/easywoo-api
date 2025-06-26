import { Controller, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PasswordResetService } from './password-reset.service';
import { SendResetPasswordEmailDto } from './dtos/send-reset-password-email.dto';
import { Success } from '../../utils/success.utils';
import { PasswordResetGuard } from '../../guard/passwordReset.guard';
import { UserDetails } from '../../decorators';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';
import { ResetPassword } from '../user/dto/resetPassword.dto';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('send-email')
  @ApiOperation({ summary: 'Send password reset email' })
  @ApiResponse({ status: 201, description: 'Reset email sent', type: Success })
  public async sendResetEmail(
    @Body() dto: SendResetPasswordEmailDto
  ): Promise<Success> {
    return this.passwordResetService.sendResetEmail(dto);
  }

  @Patch()
  @UseGuards(PasswordResetGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password updated', type: Success })
  public async updatePassword(
    @UserDetails() passwordResetPayload: PasswordResetPayload,
    @Body() resetPassword: ResetPassword
  ) {
    return await this.passwordResetService.updateUserPassword(
      passwordResetPayload.resetPasswordId,
      resetPassword
    );
  }
}