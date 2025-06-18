import { Body, Controller, Post } from '@nestjs/common';
import { AdminCredentialsService } from './admin-credentials.service';
import { AdminLoginDto } from './dtos/admin-login.dto';

@Controller('admin')
export class AdminCredentialsController {
  constructor(private readonly adminCredentialsService: AdminCredentialsService) {}

  @Post("login")
  public async login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminCredentialsService.login(adminLoginDto);
  }
}
