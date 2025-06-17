import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { QuestionnaireAnswerCreateDto } from '../question-answer/dtos/questionnaireAnswerCreate.dto';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';

@Controller('questionnaire-answer')//todo: report
export class ReportController {
  constructor(private readonly reportService: ReportService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new questionnaire answer and generate a report' })
  @ApiResponse({
    status: 201,
    description: 'The answer has been successfully created.',
    type: ReportDto
  })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: 'Bad request, validation errors or invalid data.'
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: 'Unauthorized, invalid token or missing token.'
  })
  @ApiBody({
    description: 'The questionnaire answer to create',
    type: [QuestionnaireAnswerCreateDto]
  })
  public async createBulkQuestionnaireAnswerAndGenerateReport(@Body() questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto[]) {
    return await this.reportService.createReport(questionnaireAnswerCreateDto);
  }
}
