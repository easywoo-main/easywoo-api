-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "is_allow_manyal_time" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_offer_restart" BOOLEAN NOT NULL DEFAULT false;
