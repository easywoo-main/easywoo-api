import { Injectable } from '@nestjs/common';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { UserService } from '../user/user.service';
import { QuestionnaireService } from '../questionnaire/questionnaire.service';

@Injectable()
export class QuestionnaireAnswerService {
  constructor(
    private readonly questionnaireAnswerRepository: QuestionnaireAnswerRepository,
    private readonly questionnaireService: QuestionnaireService,
    private readonly userService: UserService,
  ) {}

  public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto, userId: string) {
    // questionnaireAnswerCreateDto.userId = userId;
    const newQuestionnaireAnswer = this.questionnaireAnswerRepository.createQuestionnaireAnswer(questionnaireAnswerCreateDto);
    await this.checkCompletedQuestionsAnswer(userId);
    return newQuestionnaireAnswer;
  }

  public async checkCompletedQuestionsAnswer(userId: string): Promise<boolean> {
    const questionnaires = await this.questionnaireService.getAllQuizzes(userId);
    // const completedQuestionnaires = questionnaires.filter((questionnaire) => questionnaire.userAnswer);

    // const hasQuizCompleted = completedQuestionnaires.length === questionnaires.length;

    // await this.userService.updateUser(userId, { hasQuizCompleted });

    return true;
  }
}
