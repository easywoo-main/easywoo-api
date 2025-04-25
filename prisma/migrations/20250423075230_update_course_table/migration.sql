/*
  Warnings:

  - The values [SLIDER] on the enum `ChoiceType` will be removed. If these variants are still used in the database, this will fail.
  - The values [FILE] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[startMessageId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "ChoiceType_new" AS ENUM ('SINGLE', 'MULTIPLE_SLIDER');
ALTER TABLE "MessageChoice" ALTER COLUMN "type" TYPE "ChoiceType_new" USING ("type"::text::"ChoiceType_new");
ALTER TYPE "ChoiceType" RENAME TO "ChoiceType_old";
ALTER TYPE "ChoiceType_new" RENAME TO "ChoiceType";
DROP TYPE "ChoiceType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('TEXT', 'QUESTION_MULTIPLE', 'QUESTION_SINGLE', 'QUESTION_CHELENGES');
ALTER TABLE "ChatMessage" ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_startMessageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageChoice" DROP CONSTRAINT "MessageChoice_nextMessageId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "files" TEXT[],
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "startMessageId" TEXT,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "MessageChoice" ADD COLUMN     "timeout" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "nextMessageId" DROP NOT NULL;

-- DropTable
DROP TABLE "Chat";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_startMessageId_key" ON "Course"("startMessageId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_startMessageId_fkey" FOREIGN KEY ("startMessageId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageChoice" ADD CONSTRAINT "MessageChoice_nextMessageId_fkey" FOREIGN KEY ("nextMessageId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
