/*
  Warnings:

  - A unique constraint covering the columns `[revolutOrderId]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,chat_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_platform` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentPlatform" AS ENUM ('REVENUE_CAT', 'REVOLUT');

-- CreateEnum
CREATE TYPE "RevolutOrderType" AS ENUM ('PENDING', 'PROCESSING', 'AUTHORISED', 'COMPLITED', 'CANCELLED', 'FAILED');

-- AlterEnum
ALTER TYPE "subscription_status" ADD VALUE 'pending';

-- DropIndex
DROP INDEX "subscriptions_chat_id_idx";

-- DropIndex
DROP INDEX "subscriptions_user_id_idx";

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "payment_platform" "PaymentPlatform" NOT NULL,
ADD COLUMN     "revolutOrderId" TEXT,
ALTER COLUMN "plan" DROP NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "revolut_orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "type" "RevolutOrderType",

    CONSTRAINT "revolut_orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "revolut_orders_userId_chatId_key" ON "revolut_orders"("userId", "chatId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_revolutOrderId_key" ON "subscriptions"("revolutOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_user_id_chat_id_key" ON "subscriptions"("user_id", "chat_id");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_revolutOrderId_fkey" FOREIGN KEY ("revolutOrderId") REFERENCES "revolut_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revolut_orders" ADD CONSTRAINT "revolut_orders_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revolut_orders" ADD CONSTRAINT "revolut_orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
