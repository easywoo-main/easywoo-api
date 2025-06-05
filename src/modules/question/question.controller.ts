import { Controller, Get, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionnaireQuery } from './dtos/questionnaire.query';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { QuestionResponseDto } from './dtos/questionResponse.dto';

@Controller('question')
@ApiTags('Questionnaire')
export class QuestionController {
  constructor(private readonly questionnaireService: QuestionService) {}

  @Get('/')
  @ApiOkResponse({
    type: [QuestionResponseDto],
    description: 'Returns the question for the given step.',
  })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: 'Bad request, validation errors or invalid data.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: 'Unauthorized, invalid or missing authentication token.',
  })
  @ApiBearerAuth()
  public async getQuestionByStep(@Query() questionnaireQuery: QuestionnaireQuery) {
    return this.questionnaireService.getQuestionByStep(questionnaireQuery.step);
  }
}
