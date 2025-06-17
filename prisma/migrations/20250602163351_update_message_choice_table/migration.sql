-- DropForeignKey
ALTER TABLE "message_choices" DROP CONSTRAINT "message_choices_prev_message_id_fkey";

-- AlterTable
ALTER TABLE "message_choices" ALTER COLUMN "prev_message_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "message_choices" ADD CONSTRAINT "message_choices_prev_message_id_fkey" FOREIGN KEY ("prev_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
