/*
  Warnings:

  - You are about to drop the column `name` on the `message_choices` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "message_choices_name_prev_message_id_key";

-- AlterTable
ALTER TABLE "message_choices" DROP COLUMN "name";
