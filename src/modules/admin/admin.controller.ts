import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PageResponse } from '../../utils/page-response.utils';
import { PageRequest } from '../../utils/page-request.utils';
import { AdminEntity } from './admin.entity';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { pageRequestSchema } from '../../schemas/page-request.schema';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';
import { CreateAdminDto } from './dtos/createAdmin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  public async findAllAdminWithPagination(@Query(new JoiValidationPipe(pageRequestSchema))pageRequest: PageRequest): Promise<PageResponse<AdminEntity>> {
    return this.adminService.findAllAdminWithPagination(pageRequest);
  }

  @Post()
  public async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Patch(':id')
  public async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<AdminEntity> {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  public async deleteAdmin(@Param('id') id: string): Promise<AdminEntity> {
    return this.adminService.deleteAdmin(id);
  }
}
