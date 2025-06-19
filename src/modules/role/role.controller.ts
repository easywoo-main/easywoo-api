import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.updateRole(id, dto);
  }

  @Get()
  async findAll() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }
}