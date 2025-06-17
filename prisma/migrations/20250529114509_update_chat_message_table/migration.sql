/*
  Warnings:

  - You are about to drop the column `file` on the `message_choices` table. All the data in the column will be lost.
  - You are about to drop the `_ChatMessageToSliderProp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChatMessageToSliderProp" DROP CONSTRAINT "_ChatMessageToSliderProp_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatMessageToSliderProp" DROP CONSTRAINT "_ChatMessageToSliderProp_B_fkey";

-- AlterTable
ALTER TABLE "chat_messages" ADD COLUMN     "slider_prop_id" TEXT;

-- AlterTable
ALTER TABLE "message_choices" DROP COLUMN "file";

-- DropTable
DROP TABLE "_ChatMessageToSliderProp";

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_slider_prop_id_fkey" FOREIGN KEY ("slider_prop_id") REFERENCES "slider_props"("id") ON DELETE SET NULL ON UPDATE CASCADE;
