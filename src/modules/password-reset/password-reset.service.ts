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

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {
  }

  public async sendResetEmail(email: string): Promise<Success> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new NotFoundException('User not found');


    const code = await this.createResetPassword(user.id);

    return this.emailService.sendEmail(user.email, {
      subject: "Password Reset",
      text: `Your code ${code.code}`
    })
  }

  public async verifyCode(passwordResetDto: PasswordResetDto): Promise<AccessToken> {
    const user = await this.userService.findUserByEmail(passwordResetDto.email);

    const lastCode = await this.findLastResetPasswordByUserId(user.email);

    if (lastCode.code !== passwordResetDto.code) {
      throw new BadRequestException('Invalid code');
    }

    await this.deleteResetPassword(lastCode.id);

    return this.tokenService.generatePasswordResetTokens(user);
  }
  private async createResetPassword(userId: string): Promise<PasswordResetEntity> {
    const createPasswordReset: CreateResetPassword = {
      userId, code: codeGenerator()
    };
    return this.passwordResetRepository.createResetPassword(createPasswordReset);
  }

  public async deleteResetPassword(id: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.deleteResetPassword(id)
  }

  @CheckExists("Code not found")
  public async findLastResetPasswordByUserId(userId: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.findLastResetPasswordByUserId(userId);
  }
}
