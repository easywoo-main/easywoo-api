/*
  Warnings:

  - You are about to drop the column `startMessageId` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_startMessageId_fkey";

-- DropIndex
DROP INDEX "Course_startMessageId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "startMessageId";
