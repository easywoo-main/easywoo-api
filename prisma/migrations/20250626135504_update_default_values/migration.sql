-- AlterTable
ALTER TABLE "revolut_orders" ALTER COLUMN "type" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET DEFAULT 'pending';
