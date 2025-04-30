import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { QuestionnaireAnswerRepository } from './questionnaireAnswer.repository';
import { QuestionnaireAnswerCreateDto } from './dtos/questionnaireAnswerCreate.dto';
import { UserService } from '../user/user.service';
import { QuestionService } from '../question/question.service';
import { QuestionsType } from '@prisma/client';
import { ReportService } from '../report/report.service';
import { ReportDto } from '../report/dto/report.dto';
import { QuestionWithUserAnswerDto } from '../question/dtos/QuestionWithUserAnswerDto';
import { AnswerDto } from './dtos/answer.dto';
import { UserAnswerRepository } from './user-answer.repository';

@Injectable()
export class QuestionnaireAnswerService {
  constructor(
    private readonly questionnaireAnswerRepository: QuestionnaireAnswerRepository,
    private readonly questionnaireService: QuestionService,
    private readonly userService: UserService,
    private readonly reportService: ReportService,
    private readonly userAnswerRepository: UserAnswerRepository
  ) {
  }

  public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto, userId?: string): Promise<QuestionWithUserAnswerDto> {
    const question = await this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId);

    console.log(question)

    if ([QuestionsType.SINGLE, QuestionsType.SLIDER].includes(question.type as any) && questionnaireAnswerCreateDto.answerIds.length > 1) {
      throw new BadRequestException('Invalid answer type');
    }

    const notSelectedAnswerIds = question.answers.map((answer) => answer.id).filter((id) => !questionnaireAnswerCreateDto.answerIds.includes(id));


    const notSelectedAnswer = await Promise.all(
      notSelectedAnswerIds.map(
        async (answerId): Promise<AnswerDto> => {
          if (userId) await this.userAnswerRepository.deleteUserAnswer(answerId, userId);

          return {
            ...await this.questionnaireAnswerRepository.findAnswerById(answerId),
            isAnswered: false
          }
        })
    );

    const selectedAnswer = await Promise.all(
      questionnaireAnswerCreateDto.answerIds.map(
        async (answerId): Promise<AnswerDto> => {
          await this.userAnswerRepository.createUserAnswer(answerId, userId)
          return {
            ...await this.questionnaireAnswerRepository.findAnswerById(answerId),
            isAnswered: true
          };
        })
    )

    return {...await this.questionnaireService.getOneQuestion(questionnaireAnswerCreateDto.questionId), answers: [...notSelectedAnswer, ...selectedAnswer]};
  }

  public async createBulkQuestionnaireAnswerAndGenerateReport(questionnaireAnswerCreateDtos: QuestionnaireAnswerCreateDto[]): Promise<ReportDto>{
     const questionnaire =  await Promise.all(
      questionnaireAnswerCreateDtos.map(async (questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto): Promise<QuestionWithUserAnswerDto> =>
        await this.createQuestionnaireAnswer(questionnaireAnswerCreateDto)
      )
    );

     return this.reportService.generateReport(questionnaire);
  }
}
