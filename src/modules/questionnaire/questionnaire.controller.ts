import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { AuthGuard } from '../../guards';
import {QuestionnaireQuery} from "./dtos/questionnaire.query";
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {ErrorResponse} from "../../errorHandler/errorResponse.dto";
import {Questionnaire} from "./questionnaire.entity";

@Controller('questionnaire')
@ApiTags('Questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: Questionnaire,
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
    return this.questionnaireService.getAllQuizzes(user.id, questionnaireQuery.step);
  }
}

