import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InfoPopUpService } from './info-pop-up.service';
import { CreateUpdateInfoPopupDto } from './dtos/createUpdateInfoPopup.dto';
import { InfoPopUpEntity } from './info-pop-up.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';

@ApiTags('Info Pop-Up')
@Controller('info-pop-up')
export class InfoPopUpController {
  constructor(private readonly infoPopUpService: InfoPopUpService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new info pop-up' })
  @ApiResponse({ status: 201, description: 'Info pop-up successfully created', type: InfoPopUpEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  public async createInfoPopUp(@Body() data: CreateUpdateInfoPopupDto) {
    return this.infoPopUpService.createInfoPopUp(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch an info pop-up by ID' })
  @ApiResponse({ status: 200, description: 'Info pop-up retrieved successfully', type: InfoPopUpEntity })
  @ApiResponse({ status: 404, description: 'Info pop-up not found', type: ErrorResponse })
  public async findInfoPopUpById(@Param('id') id: string) {
    return this.infoPopUpService.findInfoPopUpById(id);
  }

  @Get('/chat-message/:chatMessageId')
  @ApiOperation({ summary: 'Fetch all info pop-ups by chat message ID' })
  @ApiResponse({ status: 200, description: 'Info pop-ups retrieved successfully', type: [InfoPopUpEntity] })
  public async findAllInfoPopUpsByChatMessageId(@Param('chatMessageId') chatMessageId: string) {
    return this.infoPopUpService.findAllInfoPopUpsByChatMessageId(chatMessageId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update an info pop-up by ID' })
  @ApiResponse({ status: 200, description: 'Info pop-up successfully updated', type: InfoPopUpEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  @ApiResponse({ status: 404, description: 'Info pop-up not found', type: ErrorResponse })
  public async updateInfoPopUp(
    @Param('id') id: string,
    @Body() data: Partial<CreateUpdateInfoPopupDto>,
  ) {
    return this.infoPopUpService.updateInfoPopUp(id, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an info pop-up by ID' })
  @ApiResponse({ status: 200, description: 'Info pop-up successfully deleted', type: InfoPopUpEntity })
  @ApiResponse({ status: 404, description: 'Info pop-up not found', type: ErrorResponse })
  public async deleteInfoPopUp(@Param('id') id: string) {
    return this.infoPopUpService.deleteInfoPopUp(id);
  }
}