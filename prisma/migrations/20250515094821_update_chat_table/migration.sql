/*
  Warnings:

  - You are about to drop the column `chat_message_id` on the `slider_props` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `slider_props` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "slider_props" DROP CONSTRAINT "slider_props_chat_message_id_fkey";

-- DropIndex
DROP INDEX "slider_props_chat_message_id_idx";

-- AlterTable
ALTER TABLE "slider_props" DROP COLUMN "chat_message_id",
ADD COLUMN     "chatId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "slider_props" ADD CONSTRAINT "slider_props_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
