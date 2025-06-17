-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "goToStep" INTEGER,
ADD COLUMN     "restartFrom" INTEGER;

-- AlterTable
ALTER TABLE "message_choices" ADD COLUMN     "goToStep" INTEGER;
