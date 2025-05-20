-- CreateEnum
CREATE TYPE "GraphType" AS ENUM ('LINE', 'BAR', 'PIE', 'DOUGHNUT', 'RADAR', 'POLAR_AREA', 'BUBBLE', 'SCATTER');

-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "graph_type" "GraphType" NOT NULL DEFAULT 'LINE';
