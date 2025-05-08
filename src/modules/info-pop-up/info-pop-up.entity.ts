import { InfoPopUp } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InfoPopUpEntity implements InfoPopUp {
    @ApiProperty({ description: 'Title of the info pop-up' })
    title: string;

    @ApiProperty({ description: 'Unique identifier of the info pop-up' })
    id: string;

    @ApiProperty({ description: 'Description of the info pop-up' })
    description: string;

    @ApiProperty({ description: 'ID of the related chat message' })
    chatMessageId: string;

    @ApiProperty({ description: 'Timestamp when the info pop-up was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the info pop-up was last updated' })
    updatedAt: Date;
}