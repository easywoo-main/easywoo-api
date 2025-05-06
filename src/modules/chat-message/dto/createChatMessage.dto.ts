import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@prisma/client';
import { CreateUpdateSliderPropDto } from './createUpdateSliderProp.dto';
import { CreateMessageChoiceWithRelationDto } from '../../message-choice/dto/createMessageChoiceWithRelation.dto';
import { CreateMessageChoiceDto } from '../../message-choice/dto/createMessageChoice.dto';

export class CreateChatMessageDto {
  @ApiProperty({ description: 'Content of the message', example: 'Hello, world!' })
  name: string;

  @ApiProperty({
    description: 'Type of the message, e.g., text, image, etc.',
    enum: MessageType,
    example: MessageType.TEXT
  })
  type: MessageType;

  @ApiProperty({
    description: 'List of file URLs associated with the message',
    example: ['https://example.com/file1.png', 'https://example.com/file2.png']
  })
  files: string[];

  @ApiProperty({
    description: 'Timeout in seconds for the message',
    example: 30
  })
  timeout?: number;

  @ApiProperty({
    description: 'List of slider properties associated with the message',
    type: [CreateUpdateSliderPropDto],
  })
  sliderProps: CreateUpdateSliderPropDto[];

  @ApiProperty({
    description: 'ID of the previous message in the chat flow',
    format: "uuid"
  })
  prevMessageId: string;

  @ApiProperty({
    description: 'ID of the chat the message belongs to',
    format: "uuid"
  })
  chatId: string;

  @ApiProperty({
    description: 'ID of the previous message choice, if any',
    format: "uuid"
  })
  prevChoiceId: string;

  @ApiProperty({
    description: 'Flag indicating whether this message is a checkpoint in the chat flow',
    example: true
  })
  isCheckpoint: boolean;

  @ApiProperty({
    description: 'List of next message choices that can follow this message',
    type: [CreateMessageChoiceDto],
  })
  nextChoices: CreateMessageChoiceDto[];
}
