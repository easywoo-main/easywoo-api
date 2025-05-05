/*
  Warnings:

  - Added the required column `easywooName` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "easywooName" TEXT NOT NULL;
