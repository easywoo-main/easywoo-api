/*
  Warnings:

  - The values [CHELENGE] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('TEXT', 'FILE', 'CHALLENGE', 'QUESTION_SINGLE', 'QUESTION_TEXT_FIELD', 'QUESTION_SLIDERS');
ALTER TABLE "ChatMessage" ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "MessageType_old";
COMMIT;
