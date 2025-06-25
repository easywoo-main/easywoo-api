import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { codeGenerator } from './verifyEmailCode.utils';
import { CreateResetPassword } from './dtos/create-reset-password.dto';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordResetEntity } from './password-reset.entity';
import { EmailService } from '../email/email.service';
import { Success } from '../../utils/success.utils';
import { PasswordResetDto } from './dtos/reset-password.dto';
import { CheckExists } from '../../decorators';
import { TokenService } from '../token/token.service';
import { AccessToken } from '../token/dtos/accessToken.dto';
import { SendResetPasswordEmailDto } from './dtos/send-reset-password-email.dto';
import { PasswordResetStatus } from '@prisma/client';
import { ResetPassword } from '../user/dto/resetPassword.dto';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {
  }

  public async sendResetEmail(sendResetPasswordEmailDto: SendResetPasswordEmailDto): Promise<Success> {
    const user = await this.userService.findUserByEmail(sendResetPasswordEmailDto.email);

    if (!user) throw new NotFoundException('User not found');

    const resetPassword = await this.createResetPassword(user.id);
    const token =  this.tokenService.generatePasswordResetTokens(resetPassword);

    const redirectUrl = new URL(sendResetPasswordEmailDto.redirectUrl);
    redirectUrl.searchParams.set('accessToken', token.accessToken);
    return this.emailService.sendEmail(user.email, {
      subject: "Password Reset",
      text: `Please follow this link if you want to change your password: ${redirectUrl.toString()}`
    });
  }

  private async createResetPassword(userId: string): Promise<PasswordResetEntity> {
    const createPasswordReset: CreateResetPassword = {
      userId,
      status: PasswordResetStatus.IN_PROGRESS
    };
    return this.passwordResetRepository.createResetPassword(createPasswordReset);
  }

  public async deleteResetPassword(id: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.updateResetPassword(id,{status: PasswordResetStatus.SUCCESS});
  }

  @CheckExists("Reset Password not found")
  public async findResetPasswordInProgressById(id: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.findResetPasswordInProgressById(id);
  }

  public async updateUserPassword(resetPasswordId: string, resetPassword: ResetPassword) {
    const passwordReset = await this.findResetPasswordInProgressById(resetPasswordId);
    await this.userService.updateUser(passwordReset.userId, resetPassword)

    await this.deleteResetPassword(passwordReset.id);
    return new Success("Password updated successfully");
  }
}
