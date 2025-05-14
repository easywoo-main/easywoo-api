/*
  Warnings:

  - Added the required column `chatId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "chatId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Chat_startMessageId_idx" ON "Chat"("startMessageId");

-- CreateIndex
CREATE INDEX "ChatMessage_chatId_idx" ON "ChatMessage"("chatId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
