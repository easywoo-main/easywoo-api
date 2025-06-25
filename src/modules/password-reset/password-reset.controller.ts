import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { PasswordResetGuard } from '../../guard/passwordReset.guard';
import { UserDetails } from '../../decorators';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';
import { ResetPassword } from '../user/dto/resetPassword.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}
}
