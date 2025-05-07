import { ApiProperty } from '@nestjs/swagger';
import { CreateResultMessageChoiceDto } from './createResultMessageChoice.dto';


export class CreateResultMessageChoiceDtoWithUserId extends CreateResultMessageChoiceDto {
  @ApiProperty({ description: 'Identifier of the user associated with the result message choice', format: 'uuid' })
  userId: string;
}