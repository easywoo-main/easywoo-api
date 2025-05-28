import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Chat, GraphType } from '@prisma/client';

export class ChatEntity implements Chat {
    name: string;
    id: string;
    freeSteps: number;
    price: number;
    landingUrl: string;
    hasIndividualConsultation: boolean;
    isDisabled: boolean;
    startMessageId: string;
    formula: string;
    masterGraph: string;
    paintPoints: string[];
    therapistAvatar: string;
    therapistName: string;
    createdAt: Date;
    updatedAt: Date;
}