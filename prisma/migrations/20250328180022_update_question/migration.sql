-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "evaluation" JSONB;

-- CreateTable
CREATE TABLE "Sentence" (
    "id" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "condition" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sentence_sentence_key" ON "Sentence"("sentence");
