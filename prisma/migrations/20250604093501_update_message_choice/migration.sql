-- AlterTable
ALTER TABLE "message_choices" ADD COLUMN     "file" TEXT,
ALTER COLUMN "text" DROP NOT NULL;
