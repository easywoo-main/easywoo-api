import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessageSliderService } from './message-slider.service';
import { MessageSliderEntity } from './message-slider.entity';
import { CreateUpdateSliderPropWithRelationDto } from './dto/createUpdateSliderPropWithRelation.dto';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';

@Controller('message-slider')
export class MessageSliderController {
  constructor(private readonly messageSliderService: MessageSliderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message slider' })
  @ApiResponse({ status: 201, description: 'Message slider successfully created', type: MessageSliderEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  public async createMessageSlider(
    @Body() data: CreateUpdateSliderPropWithRelationDto,
  ): Promise<MessageSliderEntity> {
    return this.messageSliderService.createMessageSlider(data);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Fetch a message slider by ID' })
  @ApiResponse({ status: 200, description: 'Message slider retrieved successfully', type: MessageSliderEntity })
  @ApiResponse({ status: 404, description: 'Message slider not found', type: ErrorResponse })
  public async findMessageSliderById(@Param('id') id: string): Promise<MessageSliderEntity> {
    return this.messageSliderService.findMessageSliderById(id);
  }

  @Get('/message/:chatMessageId')
  @ApiOperation({ summary: 'Fetch all message sliders by chat message ID' })
  @ApiResponse({ status: 200, description: 'Message sliders retrieved successfully', type: [MessageSliderEntity] })
  @ApiResponse({ status: 404, description: 'No message sliders found', type: ErrorResponse })
  public async findAllMessageSlidersByMessageId(
    @Param('chatMessageId') chatMessageId: string,
  ): Promise<MessageSliderEntity[]> {
    return this.messageSliderService.findAllMessageSlidersByMessageId(chatMessageId);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a message slider by ID' })
  @ApiResponse({ status: 200, description: 'Message slider successfully updated', type: MessageSliderEntity })
  @ApiResponse({ status: 400, description: 'Invalid input data', type: ErrorResponse })
  @ApiResponse({ status: 404, description: 'Message slider not found', type: ErrorResponse })
  public async updateMessageSlider(
    @Param('id') id: string,
    @Body() data: Partial<CreateUpdateSliderPropWithRelationDto>,
  ): Promise<MessageSliderEntity> {
    return this.messageSliderService.updateMessageSlider(id, data);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a message slider by ID' })
  @ApiResponse({ status: 200, description: 'Message slider successfully deleted', type: MessageSliderEntity })
  @ApiResponse({ status: 404, description: 'Message slider not found', type: ErrorResponse })
  public async deleteMessageSlider(@Param('id') id: string): Promise<MessageSliderEntity> {
    return this.messageSliderService.deleteMessageSlider(id);
  }
}