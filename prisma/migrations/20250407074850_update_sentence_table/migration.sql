/*
  Warnings:

  - You are about to drop the `_PostToSentence` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToSentence" DROP CONSTRAINT "_PostToSentence_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToSentence" DROP CONSTRAINT "_PostToSentence_B_fkey";

-- DropTable
DROP TABLE "_PostToSentence";
