/*
  Warnings:

  - You are about to drop the column `file` on the `InfoPopUp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InfoPopUp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InfoPopUp" DROP COLUMN "file",
DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
