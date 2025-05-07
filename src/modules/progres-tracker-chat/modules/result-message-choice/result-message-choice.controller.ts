import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResultMessageChoiceService } from './result-message-choice.service';
import { AuthGuard } from 'src/guard';
import { UserDetails } from 'src/decorators';
import { UserPayload } from 'src/interfaces';
import { CreateResultMessageChoiceDto } from './dtos/createResultMessageChoice.dto';

@Controller('result-message-choice')
export class ResultMessageChoiceController {
    constructor(private readonly resultMessageChoiceService: ResultMessageChoiceService) {}

    @Post()
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Create a result message choice' })
    @ApiResponse({ status: 201, description: 'The result message choice has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    public async createResultMessageChoice(
        @Body() data: CreateResultMessageChoiceDto,
        @UserDetails() user: UserPayload,
    ) {
        return this.resultMessageChoiceService.createResultMessageChoice(data, user.id);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get result message choices by user ID' })
    @ApiResponse({ status: 200, description: 'List of result message choices.' })
    @ApiResponse({ status: 404, description: 'Choices not found.' })
    public async getResultMessageChoicesByUserId(@Param('userId') userId: string) {
        return this.resultMessageChoiceService.getResultMessageChoicesByUserId(userId);
    }
}
