
import { ApiProperty } from '@nestjs/swagger';
import { CreateResultSliderPropDto } from './createResultSliderProp.dto';

export class CreateResultSliderPropDtoWithUserId extends CreateResultSliderPropDto {
  @ApiProperty({ description: 'The ID of the user', format: 'uuid' })
  userId: string;
}
