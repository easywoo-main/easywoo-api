-- CreateEnum
CREATE TYPE "subscription_status" AS ENUM ('active', 'inactive', 'cancelled');

-- CreateEnum
CREATE TYPE "questions_type" AS ENUM ('single', 'multiple', 'slider');

-- CreateEnum
CREATE TYPE "sentence_type" AS ENUM ('intro', 'user_introduction', 'target_audience', 'relationship_goals', 'final_considerations', 'emotional_baggage', 'deep_dive', 'easy_social', 'care_plan');

-- CreateEnum
CREATE TYPE "course_type" AS ENUM ('job_listing');

-- CreateEnum
CREATE TYPE "course_status" AS ENUM ('publish');

-- CreateEnum
CREATE TYPE "message_type" AS ENUM ('text', 'image', 'media', 'challenge', 'question', 'graph');

-- CreateEnum
CREATE TYPE "slider_prop_type" AS ENUM ('negative', 'positive');

-- CreateEnum
CREATE TYPE "GraphType" AS ENUM ('LINE', 'BAR', 'PIE', 'DOUGHNUT', 'RADAR', 'POLAR_AREA', 'BUBBLE', 'SCATTER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "has_quiz_completed" BOOLEAN NOT NULL DEFAULT false,
    "photo" TEXT,
    "google_user_id" TEXT,
    "apple_user_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "google_users" (
    "id" TEXT NOT NULL,
    "google_account_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "picture" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apple_users" (
    "id" TEXT NOT NULL,
    "apple_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apple_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" "subscription_status" NOT NULL DEFAULT 'active',
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "questions_type" NOT NULL,
    "mid_step_text" TEXT,
    "easywoo_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sentences" (
    "id" TEXT NOT NULL,
    "sentence" TEXT NOT NULL,
    "type" "sentence_type" NOT NULL,
    "condition" JSONB NOT NULL,
    "db_find_many_args" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sentences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "easywoo_name" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "evaluation" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "course_type" NOT NULL,
    "status" "course_status" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "step_id" INTEGER NOT NULL,
    "step_name" TEXT NOT NULL,
    "intro_name" TEXT NOT NULL,
    "intro_image" TEXT[],
    "intro_media" TEXT[],
    "to-do_list" TEXT[],
    "images" TEXT[],
    "medias" TEXT[],
    "question" TEXT NOT NULL,
    "type" "message_type" NOT NULL DEFAULT 'text',
    "timeouts" INTEGER[],
    "goToStep" INTEGER,
    "restartFrom" INTEGER,
    "is_allow_manyal_time" BOOLEAN NOT NULL DEFAULT false,
    "is_course_end" BOOLEAN NOT NULL DEFAULT false,
    "is_offer_restart" BOOLEAN NOT NULL DEFAULT false,
    "is_comment" BOOLEAN NOT NULL DEFAULT false,
    "is_barometer" BOOLEAN NOT NULL DEFAULT false,
    "is_graph" BOOLEAN NOT NULL DEFAULT false,
    "chat_id" TEXT NOT NULL,
    "next_message_id" TEXT,
    "restart_message_id" TEXT,
    "slider_prop_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slider_props" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "slider_prop_type" NOT NULL,
    "positive_message" TEXT,
    "negative_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chatId" TEXT NOT NULL,

    CONSTRAINT "slider_props_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_choices" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "info_text" TEXT NOT NULL,
    "file" TEXT,
    "goToStep" INTEGER,
    "prev_message_id" TEXT,
    "next_message_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "free_steps" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "landing_url" TEXT,
    "has_individual_consultation" BOOLEAN NOT NULL DEFAULT false,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "start_message_id" TEXT,
    "formula" TEXT NOT NULL,
    "paint_points" TEXT[],
    "master_graph" TEXT NOT NULL,
    "therapist_avatar" TEXT,
    "therapist_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_slider_props" (
    "id" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "slider_prop_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_slider_props_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_message_choices" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "message_choice_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "result_message_choices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_chat_messages" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_message_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_chat_messages_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "_report_answers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_report_answers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_course_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_course_tags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_slider_prop_chat_message" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_slider_prop_chat_message_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_user_chats" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_user_chats_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_user_id_key" ON "users"("google_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_apple_user_id_key" ON "users"("apple_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_user_name_key" ON "admins"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "google_users_google_account_id_key" ON "google_users"("google_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_users_email_key" ON "google_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "apple_users_apple_id_key" ON "apple_users"("apple_id");

-- CreateIndex
CREATE UNIQUE INDEX "apple_users_email_key" ON "apple_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "apple_users_user_id_key" ON "apple_users"("user_id");

-- CreateIndex
CREATE INDEX "subscriptions_chat_id_idx" ON "subscriptions"("chat_id");

-- CreateIndex
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions"("user_id");

-- CreateIndex
CREATE INDEX "reports_user_id_idx" ON "reports"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "questions_question_key" ON "questions"("question");

-- CreateIndex
CREATE UNIQUE INDEX "questions_name_key" ON "questions"("name");

-- CreateIndex
CREATE INDEX "questions_step_idx" ON "questions"("step");

-- CreateIndex
CREATE UNIQUE INDEX "sentences_sentence_key" ON "sentences"("sentence");

-- CreateIndex
CREATE INDEX "answers_question_id_idx" ON "answers"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_answer_question_id_key" ON "answers"("answer", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "answers_name_question_id_key" ON "answers"("name", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE INDEX "chat_messages_chat_id_idx" ON "chat_messages"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_step_name_chat_id_key" ON "chat_messages"("step_name", "chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_step_id_chat_id_key" ON "chat_messages"("step_id", "chat_id");

-- CreateIndex
CREATE INDEX "slider_props_chatId_idx" ON "slider_props"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_start_message_id_key" ON "chats"("start_message_id");

-- CreateIndex
CREATE INDEX "chats_start_message_id_idx" ON "chats"("start_message_id");

-- CreateIndex
CREATE INDEX "result_slider_props_user_id_idx" ON "result_slider_props"("user_id");

-- CreateIndex
CREATE INDEX "result_slider_props_slider_prop_id_idx" ON "result_slider_props"("slider_prop_id");

-- CreateIndex
CREATE INDEX "result_message_choices_user_id_idx" ON "result_message_choices"("user_id");

-- CreateIndex
CREATE INDEX "result_message_choices_message_choice_id_idx" ON "result_message_choices"("message_choice_id");

-- CreateIndex
CREATE INDEX "step_chat_messages_user_id_idx" ON "step_chat_messages"("user_id");

-- CreateIndex
CREATE INDEX "step_chat_messages_chat_message_id_idx" ON "step_chat_messages"("chat_message_id");

-- CreateIndex
CREATE INDEX "user_text_message_answers_user_id_idx" ON "user_text_message_answers"("user_id");

-- CreateIndex
CREATE INDEX "user_text_message_answers_chat_message_id_idx" ON "user_text_message_answers"("chat_message_id");

-- CreateIndex
CREATE INDEX "_report_answers_B_index" ON "_report_answers"("B");

-- CreateIndex
CREATE INDEX "_course_tags_B_index" ON "_course_tags"("B");

-- CreateIndex
CREATE INDEX "_slider_prop_chat_message_B_index" ON "_slider_prop_chat_message"("B");

-- CreateIndex
CREATE INDEX "_user_chats_B_index" ON "_user_chats"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_google_user_id_fkey" FOREIGN KEY ("google_user_id") REFERENCES "google_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_apple_user_id_fkey" FOREIGN KEY ("apple_user_id") REFERENCES "apple_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_restart_message_id_fkey" FOREIGN KEY ("restart_message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_next_message_id_fkey" FOREIGN KEY ("next_message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slider_props" ADD CONSTRAINT "slider_props_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_choices" ADD CONSTRAINT "message_choices_next_message_id_fkey" FOREIGN KEY ("next_message_id") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_choices" ADD CONSTRAINT "message_choices_prev_message_id_fkey" FOREIGN KEY ("prev_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_start_message_id_fkey" FOREIGN KEY ("start_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_slider_props" ADD CONSTRAINT "result_slider_props_slider_prop_id_fkey" FOREIGN KEY ("slider_prop_id") REFERENCES "slider_props"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_slider_props" ADD CONSTRAINT "result_slider_props_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_message_choices" ADD CONSTRAINT "result_message_choices_message_choice_id_fkey" FOREIGN KEY ("message_choice_id") REFERENCES "message_choices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_message_choices" ADD CONSTRAINT "result_message_choices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_chat_messages" ADD CONSTRAINT "step_chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_chat_messages" ADD CONSTRAINT "step_chat_messages_chat_message_id_fkey" FOREIGN KEY ("chat_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_text_message_answers" ADD CONSTRAINT "user_text_message_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_text_message_answers" ADD CONSTRAINT "user_text_message_answers_chat_message_id_fkey" FOREIGN KEY ("chat_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_report_answers" ADD CONSTRAINT "_report_answers_A_fkey" FOREIGN KEY ("A") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_report_answers" ADD CONSTRAINT "_report_answers_B_fkey" FOREIGN KEY ("B") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_tags" ADD CONSTRAINT "_course_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_course_tags" ADD CONSTRAINT "_course_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_slider_prop_chat_message" ADD CONSTRAINT "_slider_prop_chat_message_A_fkey" FOREIGN KEY ("A") REFERENCES "chat_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_slider_prop_chat_message" ADD CONSTRAINT "_slider_prop_chat_message_B_fkey" FOREIGN KEY ("B") REFERENCES "slider_props"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_chats" ADD CONSTRAINT "_user_chats_A_fkey" FOREIGN KEY ("A") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_chats" ADD CONSTRAINT "_user_chats_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
