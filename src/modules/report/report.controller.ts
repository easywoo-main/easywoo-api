import { Controller, Post, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { AuthGuard } from '../../guard';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { ReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Report generated successfully', type: ReportDto })
  public async generateReport(@UserDetails() user: UserPayload): Promise<ReportDto> {
    return this.reportService.generateReport(user.id);
  }
}
