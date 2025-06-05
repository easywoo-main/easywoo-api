import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSliderPropDto } from './createSliderProp.dto';

export class CreateUpdateSliderPropDto extends CreateSliderPropDto {
  @ApiPropertyOptional({ description: 'ID of the slider property (optional)', format: 'uuid' })
  id?: string;
}