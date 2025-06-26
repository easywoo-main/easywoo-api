import { $Enums, RevolutOrder } from '@prisma/client';


export class RevolutOrderEntity implements RevolutOrder {
    id: string;
    userId: string;
    chatId: string;
    amount: number;
    currency: string;
    type: $Enums.RevolutOrderType;

}