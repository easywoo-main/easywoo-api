/*
  Warnings:

  - You are about to drop the column `graph_type` on the `chats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[step_id,chat_id]` on the table `chat_messages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `step_id` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `master_graph` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "is_graph" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "step_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "graph_type",
ADD COLUMN     "master_graph" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_step_id_chat_id_key" ON "chat_messages"("step_id", "chat_id");
