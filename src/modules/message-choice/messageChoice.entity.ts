import { ApiProperty } from '@nestjs/swagger';
import {MessageChoice } from '@prisma/client';

export class MessageChoiceEntity implements MessageChoice {
    name: string;
    id: string;
    file: string;
    prevMessageId: string;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
}
