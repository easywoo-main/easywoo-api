/*
  Warnings:

  - You are about to drop the column `code` on the `PasswordReset` table. All the data in the column will be lost.
  - Added the required column `status` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PasswordResetStatus" AS ENUM ('SUCCESS', 'IN_PROGRES', 'CANCELLED');

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "code",
ADD COLUMN     "status" "PasswordResetStatus" NOT NULL;
