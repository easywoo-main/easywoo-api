-- CreateTable
CREATE TABLE "user_text_message_answers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_message_id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_text_message_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_text_message_answers_user_id_idx" ON "user_text_message_answers"("user_id");

-- CreateIndex
CREATE INDEX "user_text_message_answers_chat_message_id_idx" ON "user_text_message_answers"("chat_message_id");

-- CreateIndex
CREATE INDEX "answers_question_id_idx" ON "answers"("question_id");

-- CreateIndex
CREATE INDEX "info_pop_ups_chat_message_id_idx" ON "info_pop_ups"("chat_message_id");

-- CreateIndex
CREATE INDEX "questions_step_idx" ON "questions"("step");

-- CreateIndex
CREATE INDEX "reports_user_id_idx" ON "reports"("user_id");

-- CreateIndex
CREATE INDEX "result_message_choices_user_id_idx" ON "result_message_choices"("user_id");

-- CreateIndex
CREATE INDEX "result_message_choices_message_choice_id_idx" ON "result_message_choices"("message_choice_id");

-- CreateIndex
CREATE INDEX "result_slider_props_user_id_idx" ON "result_slider_props"("user_id");

-- CreateIndex
CREATE INDEX "result_slider_props_slider_prop_id_idx" ON "result_slider_props"("slider_prop_id");

-- CreateIndex
CREATE INDEX "slider_props_chat_message_id_idx" ON "slider_props"("chat_message_id");

-- CreateIndex
CREATE INDEX "step_chat_messages_user_id_idx" ON "step_chat_messages"("user_id");

-- CreateIndex
CREATE INDEX "step_chat_messages_chat_message_id_idx" ON "step_chat_messages"("chat_message_id");

-- CreateIndex
CREATE INDEX "subscriptions_chat_id_idx" ON "subscriptions"("chat_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- AddForeignKey
ALTER TABLE "user_text_message_answers" ADD CONSTRAINT "user_text_message_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_text_message_answers" ADD CONSTRAINT "user_text_message_answers_chat_message_id_fkey" FOREIGN KEY ("chat_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
