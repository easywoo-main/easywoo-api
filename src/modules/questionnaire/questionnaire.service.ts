import { Injectable } from '@nestjs/common';
import {QuestionnaireRepository} from "./questionnaire.repository";

@Injectable()
export class QuestionnaireService {

    constructor(private readonly questionnaireRepository: QuestionnaireRepository) {}

    public async getAllQuizzes(step?: number) {
        return this.questionnaireRepository.getAllQuizzes(step, "bc459c1f-e670-4bd7-a276-2398f54c4e50");
    }
}
