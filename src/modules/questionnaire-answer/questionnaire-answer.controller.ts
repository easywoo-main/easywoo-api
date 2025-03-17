import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {QuestionnaireAnswerService} from "./questionnaire-answer.service";
import {UserDetails} from "../../decorators";
import {UserPayload} from "../../interfaces";
import {QuestionnaireAnswerCreateDto} from "./dtos/questionnaireAnswerCreate.dto";
import {AuthGuard} from "../../guards";

@Controller('questionnaire-answer')
export class QuestionnaireAnswerController {
    constructor(private readonly questionnaireAnswerService: QuestionnaireAnswerService) {}


    @Get()
    public async getAllQuestionnaireAnswers(@UserDetails() user: UserPayload, @Query("step") step: number) {
        return await this.questionnaireAnswerService.getAllQuestionnaireAnswersByUserId(user.id, step);
    }

    @Post()
    @UseGuards(AuthGuard)
    public async createQuestionnaireAnswer(
        @Body() questionnaireAnswerCreateDto: QuestionnaireAnswerCreateDto,
        @UserDetails() user: UserPayload) {
        return await this.questionnaireAnswerService.createQuestionnaireAnswer(questionnaireAnswerCreateDto, user.id);
    }
}
