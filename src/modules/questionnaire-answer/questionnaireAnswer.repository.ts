import {Injectable} from "@nestjs/common";
import {QuestionnaireAnswerCreateDto} from "./dtos/questionnaireAnswerCreate.dto";
import {QuestionnaireAnswer} from "./questionnaireAnswer.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Questionnaire} from "../questionnaire/questionnaire.entity";

@Injectable()
export class QuestionnaireAnswerRepository {
    constructor(
        @InjectRepository(QuestionnaireAnswer)
        private readonly questionnaireAnswerRepository: Repository<QuestionnaireAnswer>
    ) {}

    public async createQuestionnaireAnswer(questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto) {
        const newQuestionnaireAnswerCreateDto = this.questionnaireAnswerRepository.create(questionnaireAnswerCreateDto);
        return this.questionnaireAnswerRepository.save(questionnaireAnswerCreateDto);
    }
}