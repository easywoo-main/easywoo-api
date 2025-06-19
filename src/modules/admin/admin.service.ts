import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { Success } from '../../utils/success.utils';
import { CheckExists } from '../../decorators';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';

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
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    return new Success('Password verified');
  }

  public async findAdminById(adminId: string) {
    return await this.adminRepository.findAdminById(adminId);

  }
}
