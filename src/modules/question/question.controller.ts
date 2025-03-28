import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { QuestionnaireQuery } from './dtos/questionnaire.query';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { QuestionEntity } from './question.entity';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('questionnaire')
@ApiTags('Questionnaire')
export class QuestionController {
  constructor(private readonly questionnaireService: QuestionService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: QuestionEntity,
    isArray: true,
  })
  @ApiBadRequestResponse({
    type: ErrorResponse,
    description: 'Bad request, validation errors or invalid data.',
  })
  @ApiUnauthorizedResponse({
    type: ErrorResponse,
    description: 'Unauthorized, invalid or missing authentication token.',
  })
  public async getAllQuizzes(@UserDetails() user: UserPayload, @Query() questionnaireQuery: QuestionnaireQuery) {
    return this.questionnaireService.getAllQuestions(user.id, questionnaireQuery.step);
  }
}
