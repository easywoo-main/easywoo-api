import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { MessageChoiceService } from './message-choice.service';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { MessageChoiceEntity } from './messageChoice.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { PageRequest } from '../../utils/page-request.utils';

@Controller('message-choice')
export class MessageChoiceController {
  constructor(private readonly messageChoiceService: MessageChoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message choice' })
  @ApiResponse({ status: 201, description: 'Message choice created successfully.', type: MessageChoiceEntity })
  public async createMessageChoice(@Body() data: CreateMessageChoiceWithRelationDto) {
    return this.messageChoiceService.createMessageChoice(data);
  }
}