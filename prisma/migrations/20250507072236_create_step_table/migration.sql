-- CreateTable
CREATE TABLE "ResultSliderProp" (
    "id" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sliderPropId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultSliderProp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultMessageChoice" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "messageChoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResultMessageChoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepChatMessage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatMessageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StepChatMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResultSliderProp" ADD CONSTRAINT "ResultSliderProp_sliderPropId_fkey" FOREIGN KEY ("sliderPropId") REFERENCES "SliderProp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultSliderProp" ADD CONSTRAINT "ResultSliderProp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMessageChoice" ADD CONSTRAINT "ResultMessageChoice_messageChoiceId_fkey" FOREIGN KEY ("messageChoiceId") REFERENCES "MessageChoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultMessageChoice" ADD CONSTRAINT "ResultMessageChoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepChatMessage" ADD CONSTRAINT "StepChatMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepChatMessage" ADD CONSTRAINT "StepChatMessage_chatMessageId_fkey" FOREIGN KEY ("chatMessageId") REFERENCES "ChatMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
