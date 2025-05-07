import { InfoPopUp } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InfoPopUpEntity implements InfoPopUp {
    @ApiProperty({ description: 'Name of the info pop-up' })
    name: string;

    @ApiProperty({ description: 'Unique identifier of the info pop-up' })
    id: string;

    @ApiProperty({ description: 'File associated with the info pop-up' })
    file: string;

    @ApiProperty({ description: 'ID of the related chat message' })
    chatMessageId: string;

    @ApiProperty({ description: 'Timestamp when the info pop-up was created' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the info pop-up was last updated' })
    updatedAt: Date;
}