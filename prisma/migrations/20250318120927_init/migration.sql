/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `QuestionnaireAnswer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "deletedAt";

-- AlterTable
ALTER TABLE "QuestionnaireAnswer" DROP COLUMN "deletedAt";
