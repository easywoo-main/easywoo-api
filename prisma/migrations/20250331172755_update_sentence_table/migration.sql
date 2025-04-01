/*
  Warnings:

  - A unique constraint covering the columns `[step]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Sentence` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SentenceType" AS ENUM ('Intro', 'UserIntroduction', 'TargetAudience', 'RelationshipGoals', 'FinalConsiderations', 'EmotionalBaggage', 'DeepDive');

-- AlterTable
ALTER TABLE "Sentence" ADD COLUMN     "type" "SentenceType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_step_key" ON "Question"("step");
