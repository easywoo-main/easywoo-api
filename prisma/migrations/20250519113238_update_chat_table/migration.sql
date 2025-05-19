-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "therapist_avatar" TEXT,
ADD COLUMN     "therapist_name" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "slider_props" ADD COLUMN     "negative_message" TEXT,
ADD COLUMN     "positive_message" TEXT;
