import { $Enums, ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
    id: string;
    stepName: string;
    introText: string;
    todoList: string[];
    question: string;
    type: $Enums.MessageType;
    timeouts: number[];
    isAllowManualTime: boolean;
    isCourseEnd: boolean;
    isOfferRestart: boolean;
    chatId: string;
    nextMessageId: string;
    restartMessageId: string;
    createdAt: Date;
    updatedAt: Date;
    introImages: string[];
    introMedias: string[];
    images: string[];
    medias: string[];
    isComment: boolean;
    isBarometer: boolean;
}