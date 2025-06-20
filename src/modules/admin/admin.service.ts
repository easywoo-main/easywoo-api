import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Success } from '../../utils/success.utils';
import { CheckExists } from '../../decorators';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { PageRequest } from '../../utils/page-request.utils';
import { CreateAdminDto } from './dtos/createAdmin.dto';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  @CheckExists("Admin not Found")
  public async getByUserName(userName: string): Promise<AdminEntity> {
    return this.adminRepository.findAdminByUsername(userName);
  }

  public async verifyAdminPassword(adminId: string, password: string): Promise<Success> {
    const admin = await this.adminRepository.findAdminByIdWithPassword(adminId);
    console.log(admin);
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return new Success('Password verified');
  }

  public async findAdminById(adminId: string) {
    return await this.adminRepository.findAdminById(adminId);

  }

  async findAllAdminWithPagination(pageRequest: PageRequest) {
    const [admins, count] = await Promise.all([
      this.adminRepository.findAdminsWithPagination(pageRequest),
      this.adminRepository.countAdminsWithPagination(pageRequest)
    ])
    return pageRequest.toPageResponse(admins, count);
  }

  public async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    return this.adminRepository.createAdmin(createAdminDto);
  }

  public async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): Promise<AdminEntity> {
    return this.adminRepository.updateAdmin(adminId, updateAdminDto);
  }

  public async deleteAdmin(adminId: string): Promise<AdminEntity> {
    return this.adminRepository.deleteAdmin(adminId);
  }

}
