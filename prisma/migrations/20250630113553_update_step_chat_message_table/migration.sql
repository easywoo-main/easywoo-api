/*
  Warnings:

  - You are about to drop the `result_message_choices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_text_message_answers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stepChatMessageId` to the `result_slider_props` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `step_chat_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "result_message_choices" DROP CONSTRAINT "result_message_choices_message_choice_id_fkey";

-- DropForeignKey
ALTER TABLE "result_message_choices" DROP CONSTRAINT "result_message_choices_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_text_message_answers" DROP CONSTRAINT "user_text_message_answers_chat_message_id_fkey";

-- DropForeignKey
ALTER TABLE "user_text_message_answers" DROP CONSTRAINT "user_text_message_answers_user_id_fkey";

-- AlterTable
ALTER TABLE "result_slider_props" ADD COLUMN     "stepChatMessageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "step_chat_messages" ADD COLUMN     "answer" TEXT,
ADD COLUMN     "challengeTime" TEXT,
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD COLUMN     "message_choice_id" TEXT,
ADD COLUMN     "timeSpent" TEXT;

-- DropTable
DROP TABLE "result_message_choices";

-- DropTable
DROP TABLE "user_text_message_answers";

-- CreateIndex
CREATE INDEX "step_chat_messages_message_choice_id_idx" ON "step_chat_messages"("message_choice_id");

-- AddForeignKey
ALTER TABLE "result_slider_props" ADD CONSTRAINT "result_slider_props_stepChatMessageId_fkey" FOREIGN KEY ("stepChatMessageId") REFERENCES "step_chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_chat_messages" ADD CONSTRAINT "step_chat_messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_chat_messages" ADD CONSTRAINT "step_chat_messages_message_choice_id_fkey" FOREIGN KEY ("message_choice_id") REFERENCES "message_choices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
