/*
  Warnings:

  - You are about to drop the column `timeout` on the `chat_messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "timeout",
ADD COLUMN     "timeouts" INTEGER[];
