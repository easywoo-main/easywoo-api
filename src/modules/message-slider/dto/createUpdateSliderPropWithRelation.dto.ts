import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdateSliderPropDto } from '../../chat-message/dto/createUpdateSliderProp.dto';

export class CreateUpdateSliderPropWithRelationDto extends CreateUpdateSliderPropDto {
  @ApiProperty({
    description: 'Identifier of the chat message associated with this slider',
    format: 'uuid',
  })
  chatId: string;
}