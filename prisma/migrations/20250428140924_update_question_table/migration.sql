/*
  Warnings:

  - Added the required column `midStepText` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "midStepText" TEXT NOT NULL;
