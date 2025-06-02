import { $Enums, ChatMessage, MessageType } from '@prisma/client';

export class ChatMessageEntity implements ChatMessage {
    goToStep: number;
    restartFrom: number;
    sliderPropId: string;
    id: string;
    nextMessageId: string;
    createdAt: Date;
    updatedAt: Date;
    stepName: string;
    introText: string;
    introImages: string[];
    introMedias: string[];
    todoList: string[];
    images: string[];
    medias: string[];
    question: string;
    type: $Enums.MessageType;
    timeouts: number[];
    isAllowManualTime: boolean;
    isCourseEnd: boolean;
    isOfferRestart: boolean;
    isComment: boolean;
    isBarometer: boolean;
    chatId: string;
    restartMessageId: string;
    stepId: number;
    isGraph: boolean;
}