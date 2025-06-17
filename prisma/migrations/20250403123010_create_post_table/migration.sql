/*
  Warnings:

  - The values [single,multiple,slider] on the enum `QuestionsType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Intro,UserIntroduction,TargetAudience,RelationshipGoals,FinalConsiderations,EmotionalBaggage,DeepDive,EasySocial] on the enum `SentenceType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('JOB_LISTING');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISH');

-- AlterEnum
BEGIN;
CREATE TYPE "QuestionsType_new" AS ENUM ('SINGLE', 'MULTIPLE', 'SLIDER');
ALTER TABLE "Question" ALTER COLUMN "type" TYPE "QuestionsType_new" USING ("type"::text::"QuestionsType_new");
ALTER TYPE "QuestionsType" RENAME TO "QuestionsType_old";
ALTER TYPE "QuestionsType_new" RENAME TO "QuestionsType";
DROP TYPE "QuestionsType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SentenceType_new" AS ENUM ('INTRO', 'USER_INTRODUCTION', 'TARGET_AUDIENCE', 'RELATIONSHIP_GOALS', 'FINAL_CONSIDERATIONS', 'EMOTIONAL_BAGGAGE', 'DEEP_DIVE', 'EASY_SOCIAL');
ALTER TABLE "Sentence" ALTER COLUMN "type" TYPE "SentenceType_new" USING ("type"::text::"SentenceType_new");
ALTER TYPE "SentenceType" RENAME TO "SentenceType_old";
ALTER TYPE "SentenceType_new" RENAME TO "SentenceType";
DROP TYPE "SentenceType_old";
COMMIT;

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "status" "PostStatus" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
