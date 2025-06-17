/*
  Warnings:

  - You are about to drop the column `info` on the `message_choices` table. All the data in the column will be lost.
  - Added the required column `info_text` to the `message_choices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message_choices" DROP COLUMN "info",
ADD COLUMN     "info_text" TEXT NOT NULL;
