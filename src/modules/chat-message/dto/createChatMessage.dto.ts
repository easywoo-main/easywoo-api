import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';
import { CreateUpdateSliderPropDto } from './createUpdateSliderProp.dto';

export class CreateChatMessageDto {
  @ApiProperty({ description: 'Content of the message', example: 'Hello, world!' })
  name: string;

  @ApiProperty({ description: 'Type of the message', enum: MessageType, example: MessageType.TEXT })
  type: MessageType;

  files: string[]

  timeout: number

  sliderProps: CreateUpdateSliderPropDto[]

  prevMessageId: string

  chatId: string

  prevChoiceId: string

  isCheckpoint: boolean

}
