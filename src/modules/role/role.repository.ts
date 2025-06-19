import { Injectable } from '@nestjs/common';
import { Prisma } from '.prisma/client';
import { Repository } from '../../database/repository.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleRepository {
  private readonly roleRepository: Prisma.RoleDelegate;

  constructor(repository: Repository) {
    this.roleRepository = repository.role;
  }

  public async createRole(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.roleRepository.create({data: createRoleDto});
  }

  public async updateRole(roleId: string, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
    return this.roleRepository.update({ where: { id: roleId }, data: updateRoleDto });
  }

  public async getAllRoles(): Promise<RoleEntity[]> {
    return this.roleRepository.findMany();
  }

  public async getRoleById(id: string): Promise<RoleEntity> {
    return this.roleRepository.findUnique({ where: { id } });
  }
}
