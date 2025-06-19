import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Prisma } from '@prisma/client';
import { Repository } from '../../database/repository.service';
import { PageRequest } from '../../utils/page-request.utils';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';
import { CreateAdminDto } from './dtos/createAdmin.dto';

const selectWithPassword: Record<keyof AdminEntity, true> = Object.fromEntries(Object.keys(new AdminEntity()).map((key) => [key, true])) as Record<keyof AdminEntity, true>;

@Injectable()
export class AdminRepository {
  private adminRepository: Prisma.AdminDelegate;

  constructor(repository: Repository) {
    this.adminRepository = repository.admin;
  }

  public async findAdminByIdWithPassword(adminId: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({ where: { id: adminId }, select: selectWithPassword });
  }

  public async findAdminByUsername(userName: string): Promise<AdminEntity> {
    return this.adminRepository.findUnique({ where: { userName } });
  }

  public async findAdminById(adminId: string) {
    return this.adminRepository.findUnique({ where: { id: adminId } });
  }

  public async findAdminsWithPagination(pageRequest: PageRequest): Promise<AdminEntity[]> {
    return this.adminRepository.findMany({
      where: this.getWhereFilter(pageRequest),
      ...pageRequest.getFilter()
    });
  }

  public getWhereFilter(pageRequest: PageRequest): Prisma.AdminWhereInput {
    return {
      userName: {
        contains: pageRequest.search || '', mode: 'insensitive'
      }
    };
  }

  public async countAdminsWithPagination(pageRequest: PageRequest): Promise<number> {
      return this.adminRepository.count({where: this.getWhereFilter(pageRequest)});
  }

  public async createAdmin(data: CreateAdminDto): Promise<AdminEntity> {
    return this.adminRepository.create({data});
  }

  public async updateAdmin(adminId: string, data: UpdateAdminDto): Promise<AdminEntity> {
    return this.adminRepository.update({
      where: { id: adminId },
      data,
    });
  }

  public async deleteAdmin(adminId: string): Promise<AdminEntity> {
    return this.adminRepository.delete({
      where: { id: adminId },
    });
  }
}
