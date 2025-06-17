-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "hasIndividualConsultation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDisabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "landingUrl" TEXT;
