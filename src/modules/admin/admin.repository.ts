import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Prisma } from '@prisma/client';
import { Repository } from '../../database/repository.service';

const selectWithPassword: Record<keyof AdminEntity, true> = Object.fromEntries(Object.keys(new AdminEntity()).map((key) => [key, true])) as Record<keyof AdminEntity, true>;

@Injectable()
export class AdminRepository {
  private adminRepository: Prisma.AdminDelegate;
  constructor(repository: Repository) {
    this.adminRepository = repository.admin
  }

  public async findAdminByIdWithPassword(adminId: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({where:{id: adminId}, select: selectWithPassword});
  }

  public async findAdminByUsername(userName: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({where: {userName}});
  }

  public async findAdminById(adminId: string) {
    return this.adminRepository.findUnique({where:{id: adminId}});
  }
}
