import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { UserDetails } from '../../decorators';
import { UserPayload } from '../../interfaces';
import { AuthGuard } from '../../guards';

@Controller('questionnaire')
export class QuestionnaireController {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  public async getAllQuizzes(@UserDetails() user: UserPayload, @Query('step') step: number) {
    return this.questionnaireService.getAllQuizzes(user.id, step);
  }
}
