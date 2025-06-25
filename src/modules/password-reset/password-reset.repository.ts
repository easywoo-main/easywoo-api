import { Injectable } from '@nestjs/common';
import { CreateResetPassword } from './dtos/create-reset-password.dto';
import { Repository } from 'src/database/repository.service';
import { PasswordResetStatus, Prisma } from '@prisma/client';
import { PasswordResetEntity } from './password-reset.entity';
import { UpdateResetPassword } from './dtos/update-reset-password.dto';

@Injectable()
export class PasswordResetRepository {
  private readonly passwordResetRepository: Prisma.PasswordResetDelegate

  constructor(
    databaseService: Repository
    ) {
    this.passwordResetRepository = databaseService.passwordReset
  }

  public async createResetPassword(data: CreateResetPassword): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.create({data});
  }

  public async findResetPasswordInProgressById(resetPasswordId: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.findUnique({
      where: { id: resetPasswordId, status:  PasswordResetStatus.IN_PROGRESS},
    });
  }

  public async updateResetPassword(id: string, data: UpdateResetPassword ): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.update({where: { id }, data});

  }
}
