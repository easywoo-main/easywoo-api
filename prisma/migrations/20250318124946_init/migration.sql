/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Questionnaire` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId,userId]` on the table `QuestionnaireAnswer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "picture" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Questionnaire_question_key" ON "Questionnaire"("question");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionnaireAnswer_questionId_userId_key" ON "QuestionnaireAnswer"("questionId", "userId");
