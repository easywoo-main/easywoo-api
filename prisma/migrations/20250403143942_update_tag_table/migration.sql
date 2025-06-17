/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "SentenceType" ADD VALUE 'CARE_PLAN';

-- CreateTable
CREATE TABLE "_PostToSentence" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToSentence_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostToSentence_B_index" ON "_PostToSentence"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- AddForeignKey
ALTER TABLE "_PostToSentence" ADD CONSTRAINT "_PostToSentence_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToSentence" ADD CONSTRAINT "_PostToSentence_B_fkey" FOREIGN KEY ("B") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
