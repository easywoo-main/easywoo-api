import { Injectable } from '@nestjs/common';
import { CreateResetPassword } from './dtos/create-reset-password.dto';
import { Repository } from 'src/database/repository.service';
import { Prisma } from '@prisma/client';
import { PasswordResetEntity } from './password-reset.entity';

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

  public async findLastResetPasswordByUserId(userId: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.findFirst({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  public async deleteResetPassword(id: string): Promise<PasswordResetEntity> {
    return this.passwordResetRepository.delete({where: { id }});

  }
}
