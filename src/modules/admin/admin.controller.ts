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
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @UseGuards(AdminRoleGuard)
  @ApiOperation({ summary: 'Get all admins with pagination' })
  @ApiResponse({ status: 200, description: 'List of admins with pagination', type: [AdminEntity]})
  public async findAllAdminWithPagination(@Query(new JoiValidationPipe(pageRequestSchema))pageRequest: PageRequest): Promise<PageResponse<AdminEntity>> {
    return this.adminService.findAllAdminWithPagination(pageRequest);
  }

  @Post()
  @UseGuards(AdminRoleGuard)
  @ApiOperation({ summary: 'Create new admin' })
  @ApiResponse({ status: 201, description: 'Admin created', type: AdminEntity })
  public async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update admin by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Admin updated', type: AdminEntity })
  public async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto
  ): Promise<AdminEntity> {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete admin by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Admin deleted', type: AdminEntity })
  public async deleteAdmin(@Param('id') id: string): Promise<AdminEntity> {
    return this.adminService.deleteAdmin(id);
  }
}
