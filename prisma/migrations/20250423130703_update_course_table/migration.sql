/*
  Warnings:

  - The values [QUESTION_MULTIPLE,QUESTION_CHELENGES] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `timeout` on the `MessageChoice` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `MessageChoice` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SliderPropType" AS ENUM ('NEGATIVE', 'POSITIVE');

-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('TEXT', 'FILE', 'CHELENGE', 'QUESTION_SINGLE', 'QUESTION_TEXT_FIELD', 'QUESTION_SLIDERS');
ALTER TABLE "ChatMessage" ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "timeout" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "MessageChoice" DROP COLUMN "timeout",
DROP COLUMN "type",
ADD COLUMN     "file" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- DropEnum
DROP TYPE "ChoiceType";

-- CreateTable
CREATE TABLE "SliderProp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SliderPropType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "chatMessageId" TEXT NOT NULL,

    CONSTRAINT "SliderProp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SliderProp" ADD CONSTRAINT "SliderProp_chatMessageId_fkey" FOREIGN KEY ("chatMessageId") REFERENCES "ChatMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
