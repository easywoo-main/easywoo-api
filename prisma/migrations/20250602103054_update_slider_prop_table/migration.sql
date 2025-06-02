-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_slider_prop_id_fkey";

-- CreateTable
CREATE TABLE "_slider_prop_chat_message" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_slider_prop_chat_message_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_slider_prop_chat_message_B_index" ON "_slider_prop_chat_message"("B");

-- AddForeignKey
ALTER TABLE "_slider_prop_chat_message" ADD CONSTRAINT "_slider_prop_chat_message_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_slider_prop_chat_message" ADD CONSTRAINT "_slider_prop_chat_message_B_fkey" FOREIGN KEY ("B") REFERENCES "slider_props"("id") ON DELETE CASCADE ON UPDATE CASCADE;
