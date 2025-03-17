import {Repository} from "typeorm";
import {Questionnaire} from "./questionnaire.entity";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class QuestionnaireRepository {
    constructor(
        @InjectRepository(Questionnaire)
        private readonly questionnaireRepository: Repository<Questionnaire>) {}

    public async getAllQuizzes(step?: number, userId?: string) {
        return this.questionnaireRepository
            .createQueryBuilder('questionnaire')
            .leftJoinAndSelect('questionnaire.userAnswers', 'userAnswers')
            .leftJoinAndSelect('userAnswers.user', 'user')
            .where(step ? 'questionnaire.step = :step' : '1=1', { step })
            // .andWhere(userId ? 'user.id = :userId' : '1=1', { userId })
            .getMany();
    }
}