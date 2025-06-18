import { Injectable } from '@nestjs/common';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { AdminAuthDto } from './dtos/admin-auth.dto';
import { AdminService } from '../../admin/admin.service';
import { TokenService } from '../../token/token.service';
import { AdminEntity } from '../../admin/admin.entity';
import { Tokens } from '../../token/dtos/tokens.dto';

@Injectable()
export class AdminCredentialsService {
  constructor(
    private readonly adminService: AdminService,
    private readonly tokenService: TokenService
  ) {}


  public async login(adminLoginDto: AdminLoginDto): Promise<AdminAuthDto> {
    const admin: AdminEntity = await this.adminService.getByUserName(adminLoginDto.username);

    await this.adminService.verifyAdminPassword(admin.id, adminLoginDto.password);

    const tokens: Tokens = await this.tokenService.generateAdminAccessTokens(admin)
    return {
      admin,
      ...tokens
    }
  }
}
