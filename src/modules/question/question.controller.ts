import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { QuestionnaireQuery } from './dtos/questionnaire.query';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { QuestionEntity } from './question.entity';
import { AuthGuard } from '../../guard/auth.guard';
import { QuestionWithStepDto } from './dtos/questionWithStep.dto';

@Controller('question')
@ApiTags('Questionnaire')
export class QuestionController {
  constructor(private readonly questionnaireService: QuestionService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: QuestionWithStepDto,
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
  @ApiBearerAuth()
  public async getQuestionByStep(@UserDetails() user: UserPayload, @Query() questionnaireQuery: QuestionnaireQuery) {
    return this.questionnaireService.getQuestionByStep(user.id, questionnaireQuery.step);
  }
}
