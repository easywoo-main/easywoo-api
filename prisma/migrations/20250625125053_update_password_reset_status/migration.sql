/*
  Warnings:

  - The values [IN_PROGRES] on the enum `PasswordResetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PasswordResetStatus_new" AS ENUM ('SUCCESS', 'IN_PROGRESS', 'CANCELLED');
ALTER TABLE "PasswordReset" ALTER COLUMN "status" TYPE "PasswordResetStatus_new" USING ("status"::text::"PasswordResetStatus_new");
ALTER TYPE "PasswordResetStatus" RENAME TO "PasswordResetStatus_old";
ALTER TYPE "PasswordResetStatus_new" RENAME TO "PasswordResetStatus";
DROP TYPE "PasswordResetStatus_old";
COMMIT;
