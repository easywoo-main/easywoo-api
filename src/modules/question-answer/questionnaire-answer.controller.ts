import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuestionnaireAnswerService } from './questionnaire-answer.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { AuthGuard } from '../../guard';
import { AnswerEntity } from './questionnaireAnswer.entity';

@ApiTags('Questionnaire Answer')
@ApiBearerAuth()
@Controller('questionnaire-answer')
export class QuestionnaireAnswerController {
  constructor(private readonly questionnaireAnswerService: QuestionnaireAnswerService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new questionnaire answer' })
  @ApiResponse({
    status: 201,
    type: AnswerEntity,
    description: 'The answer has been successfully created.',
  })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: 'Bad request, validation errors or invalid data.',
  })
  @ApiBody({
    description: 'The questionnaire answer to create',
    type: [QuestionnaireAnswerCreateDto],
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: 'Unauthorized, invalid token or missing token.',
  })
  public async createBulkQuestionnaireAnswer(@Body() questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto[], @UserDetails() user: UserPayload) {
    return await this.questionnaireAnswerService.createBulkQuestionnaireAnswer(questionnaireAnswerCreateDto, user.id);
  }
}
