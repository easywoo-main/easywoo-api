/*
  Warnings:

  - You are about to drop the `_AnswerToReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CourseToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AnswerToReport" DROP CONSTRAINT "_AnswerToReport_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerToReport" DROP CONSTRAINT "_AnswerToReport_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTag" DROP CONSTRAINT "_CourseToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTag" DROP CONSTRAINT "_CourseToTag_B_fkey";

-- DropTable
DROP TABLE "_AnswerToReport";

-- DropTable
DROP TABLE "_ChatToUser";

-- DropTable
DROP TABLE "_CourseToTag";

-- CreateTable
CREATE TABLE "_report_answers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_report_answers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_course_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_course_tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_user_chats" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_user_chats_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_report_answers_B_index" ON "_report_answers"("B");

-- CreateIndex
CREATE INDEX "_course_tags_B_index" ON "_course_tags"("B");

-- CreateIndex
CREATE INDEX "_user_chats_B_index" ON "_user_chats"("B");

-- AddForeignKey
ALTER TABLE "_report_answers" ADD CONSTRAINT "_report_answers_A_fkey" FOREIGN KEY ("A") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_report_answers" ADD CONSTRAINT "_report_answers_B_fkey" FOREIGN KEY ("B") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_tags" ADD CONSTRAINT "_course_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_tags" ADD CONSTRAINT "_course_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_chats" ADD CONSTRAINT "_user_chats_A_fkey" FOREIGN KEY ("A") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_chats" ADD CONSTRAINT "_user_chats_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
