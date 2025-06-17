/*
  Warnings:

  - The values [file,question_single,question_text_field,question_sliders] on the enum `message_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `files` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `is_checkpoint` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `chat_messages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the `info_pop_ups` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[step_name,chat_id]` on the table `chat_messages` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,prev_message_id]` on the table `message_choices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intro_name` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step_name` to the `chat_messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `message_choices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `message_choices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "message_type_new" AS ENUM ('text', 'image', 'media', 'challenge', 'question', 'graph');
ALTER TABLE "chat_messages" ALTER COLUMN "type" TYPE "message_type_new" USING ("type"::text::"message_type_new");
ALTER TYPE "message_type" RENAME TO "message_type_old";
ALTER TYPE "message_type_new" RENAME TO "message_type";
DROP TYPE "message_type_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "info_pop_ups" DROP CONSTRAINT "info_pop_ups_chat_message_id_fkey";

-- AlterTable
ALTER TABLE "chat_messages" DROP COLUMN "files",
DROP COLUMN "is_checkpoint",
DROP COLUMN "name",
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "intro_image" TEXT[],
ADD COLUMN     "intro_media" TEXT[],
ADD COLUMN     "intro_name" TEXT NOT NULL,
ADD COLUMN     "is_barometer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_comment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_course_end" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "medias" TEXT[],
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "restart_message_id" TEXT,
ADD COLUMN     "step_name" TEXT NOT NULL,
ADD COLUMN     "to-do_list" TEXT[],
ALTER COLUMN "type" SET DEFAULT 'text';

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "message_choices" ADD COLUMN     "info" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "info_pop_ups";

-- CreateTable
CREATE TABLE "_ChatMessageToSliderProp" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChatMessageToSliderProp_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ChatMessageToSliderProp_B_index" ON "_ChatMessageToSliderProp"("B");

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_step_name_chat_id_key" ON "chat_messages"("step_name", "chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_choices_name_prev_message_id_key" ON "message_choices"("name", "prev_message_id");

-- CreateIndex
CREATE INDEX "slider_props_chatId_idx" ON "slider_props"("chatId");

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_restart_message_id_fkey" FOREIGN KEY ("restart_message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessageToSliderProp" ADD CONSTRAINT "_ChatMessageToSliderProp_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatMessageToSliderProp" ADD CONSTRAINT "_ChatMessageToSliderProp_B_fkey" FOREIGN KEY ("B") REFERENCES "slider_props"("id") ON DELETE CASCADE ON UPDATE CASCADE;
