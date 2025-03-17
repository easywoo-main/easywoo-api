import { Controller, Get, Query } from '@nestjs/common';
import {PageRequest} from "../../utils/pageable.utils";

@Controller('quiz')
export class QuizController {
  @Get('/')
  public async getAllQuizzes(@Query("page") pageNumber: number) {
    const pageRequest = new PageRequest({
      pageNumber
    })
    return;
  }
}
