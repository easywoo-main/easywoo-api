import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PageResponse } from '../../utils/page-response.utils';
import { PageRequest } from '../../utils/page-request.utils';
import { AdminEntity } from './admin.entity';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { pageRequestSchema } from '../../schemas/page-request.schema';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';
import { CreateAdminDto } from './dtos/createAdmin.dto';
import { AdminRoleGuard } from '../../guard/adminRole.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AdminRoleGuard)
  public async findAllAdminWithPagination(@Query(new JoiValidationPipe(pageRequestSchema))pageRequest: PageRequest): Promise<PageResponse<AdminEntity>> {
    return this.adminService.findAllAdminWithPagination(pageRequest);
  }

  @Post()
  @UseGuards(AdminRoleGuard)
  public async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  public async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<AdminEntity> {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  public async deleteAdmin(@Param('id') id: string): Promise<AdminEntity> {
    return this.adminService.deleteAdmin(id);
  }
}
