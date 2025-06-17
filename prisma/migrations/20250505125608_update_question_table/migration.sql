/*
  Warnings:

  - You are about to alter the column `timeout` on the `ChatMessage` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `easywooName` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "timeout" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "easywooName" TEXT NOT NULL;
