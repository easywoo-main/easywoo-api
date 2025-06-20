import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(dto: CreateRoleDto) {
    return this.roleRepository.createRole(dto);
  }

  async updateRole(id: string, dto: UpdateRoleDto) {
    return this.roleRepository.updateRole(id, dto);
  }

  async getAllRoles() {
    return this.roleRepository.getAllRoles();
  }

  async getRoleById(id: string) {
    return this.roleRepository.getRoleById(id);
  }
  async getRoleByName(name: string){
    return this.roleRepository.getRoleByName(name);
  }
}