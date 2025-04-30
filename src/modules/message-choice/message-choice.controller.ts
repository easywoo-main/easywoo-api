import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { MessageChoiceService } from './message-choice.service';
import { CreateMessageChoiceWithRelationDto } from './dto/createMessageChoiceWithRelation.dto';
import { UpdateMessageChoiceDto } from './dto/updateMessageChoice.dto';
import { MessageChoiceEntity } from './messageChoice.entity';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';

@Controller('message-choice')
export class MessageChoiceController {
  constructor(private readonly messageChoiceService: MessageChoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message choice' })
  @ApiResponse({ status: 201, description: 'Message choice created successfully.', type: MessageChoiceEntity })
  public async createMessageChoice(@Body() data: CreateMessageChoiceWithRelationDto) {
    return this.messageChoiceService.createMessageChoice(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a message choice by ID' })
  @ApiResponse({ status: 200, description: 'Message choice retrieved successfully.', type: MessageChoiceEntity })
  @ApiNotFoundResponse({ description: 'Message choice not found.', type: ErrorResponse })
  public async findMessageChoiceById(@Param('id') id: string) {
    return await this.messageChoiceService.findMessageChoiceById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a message choice by ID' })
  @ApiResponse({ status: 200, description: 'Message choice updated successfully.', type: MessageChoiceEntity })
  @ApiNotFoundResponse({ description: 'Message choice not found.', type: ErrorResponse })
  public async updateMessageChoice(
    @Param('id') id: string,
    @Body() data: UpdateMessageChoiceDto,
  ) {
    return this.messageChoiceService.updateMessageChoice(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message choice by ID' })
  @ApiResponse({ status: 200, description: 'Message choice deleted successfully.', type: MessageChoiceEntity })
  @ApiNotFoundResponse({ description: 'Message choice not found.', type: ErrorResponse })
  public async deleteMessageChoice(@Param('id') id: string) {
    return this.messageChoiceService.deleteMessageChoice(id);
  }
}