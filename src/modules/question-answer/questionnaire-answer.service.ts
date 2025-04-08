import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { QuestionDto } from '../question/dtos/question.dto';
import { QuestionsType } from '@prisma/client';
import { ReportService } from '../report/report.service';
import { ReportDto } from '../report/dto/report.dto';
import { QuestionnaireDto } from '../question/dtos/questionnaire.dto';

@Injectable()
export class QuestionnaireAnswerService {
  constructor(
    private readonly questionnaireAnswerRepository: QuestionnaireAnswerRepository,
    private readonly questionnaireService: QuestionService,
    private readonly userService: UserService,
    private readonly reportService: ReportService
  ) {
  }

  public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto) {
    const question: QuestionDto = await this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId, questionnaireAnswerCreateDto.userId);

    if ([QuestionsType.SINGLE, QuestionsType.SLIDER].includes(question.type as any) && questionnaireAnswerCreateDto.answerIds.length > 1) {
      throw new BadRequestException('Invalid answer type');
    }

    const notSelectedAnswerIds = question.answers.map((answer) => answer.id).filter((id) => !questionnaireAnswerCreateDto.answerIds.includes(id));

    await Promise.all([
      ...notSelectedAnswerIds.map((answerId) => this.questionnaireAnswerRepository.disconnectQuestionnaireAnswer(answerId, questionnaireAnswerCreateDto.userId)),
      ...questionnaireAnswerCreateDto.answerIds.map((answerId) => this.questionnaireAnswerRepository.createQuestionnaireAnswer(answerId, questionnaireAnswerCreateDto.userId)),
    ]);
    await this.checkCompletedQuestionsAnswer(questionnaireAnswerCreateDto.userId);
    return this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId, questionnaireAnswerCreateDto.userId);
  }

  public async checkCompletedQuestionsAnswer(userId: string): Promise<boolean> {
    const questionnaire = await this.questionnaireService.getAllQuestions(userId);
    const completedQuestionnaires = questionnaire.filter((questionnaire) => questionnaire.answers.some((answer) => answer.isAnswered));
    const hasQuizCompleted = completedQuestionnaires.length === questionnaire.length;

    await this.userService.updateUser(userId, { hasQuizCompleted });

    return hasQuizCompleted;
  }

  public async createBulkQuestionnaireAnswerAndGenerateReport(questionnaireAnswerCreateDtos: QuestionnaireAnswerCreateDto[], userId: string): Promise<ReportDto>{
     await Promise.all(
      questionnaireAnswerCreateDtos.map(async (questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto): Promise<QuestionDto> =>
       await this.createQuestionnaireAnswer({ ...questionnaireAnswerCreateDto, userId })
      )
    );

     return this.reportService.generateReport(userId);
  }
}
