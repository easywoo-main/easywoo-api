/*
  Warnings:

  - You are about to drop the column `googleId` on the `GoogleUser` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `GoogleUser` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleAccountId]` on the table `GoogleUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleAccountId` to the `GoogleUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GoogleUser_googleId_key";

-- AlterTable
ALTER TABLE "GoogleUser" DROP COLUMN "googleId",
DROP COLUMN "photo",
ADD COLUMN     "googleAccountId" TEXT NOT NULL,
ADD COLUMN     "picture" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "picture",
DROP COLUMN "updatedAt",
ALTER COLUMN "password" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GoogleUser_googleAccountId_key" ON "GoogleUser"("googleAccountId");
