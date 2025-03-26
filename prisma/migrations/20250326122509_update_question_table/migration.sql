/*
  Warnings:

  - You are about to drop the `Questionnaire` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionnaireAnswer" DROP CONSTRAINT "QuestionnaireAnswer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireAnswer" DROP CONSTRAINT "QuestionnaireAnswer_userId_fkey";

-- DropTable
DROP TABLE "Questionnaire";

-- DropTable
DROP TABLE "QuestionnaireAnswer";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "type" "QuestionsType" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnswerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnswerToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_key" ON "Question"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Question_name_key" ON "Question"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_answer_questionId_key" ON "Answer"("answer", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_name_questionId_key" ON "Answer"("name", "questionId");

-- CreateIndex
CREATE INDEX "_AnswerToUser_B_index" ON "_AnswerToUser"("B");

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToUser" ADD CONSTRAINT "_AnswerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Answer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToUser" ADD CONSTRAINT "_AnswerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
