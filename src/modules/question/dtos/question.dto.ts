import { QuestionEntity } from '../question.entity';
import { AnswerDto } from '../../question-answer/dtos/answer.dto';

export class QuestionDto extends QuestionEntity {
  answers: AnswerDto[];
}
