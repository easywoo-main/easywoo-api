import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Prisma } from '@prisma/client';
import { Repository } from '../../database/repository.service';

@Injectable()
export class AdminRepository {
  private adminRepository: Prisma.AdminDelegate;
  constructor(repository: Repository) {
    this.adminRepository = repository.admin
  }

  public async findAdminByIdWithPassword(adminId: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({where:{id: adminId}});
  }

  public async findAdminByUsername(userName: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({where: {userName}});
  }

}
