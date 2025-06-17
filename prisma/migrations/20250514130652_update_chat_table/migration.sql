/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AppleUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GoogleUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InfoPopUp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageChoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResultMessageChoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResultSliderProp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SliderProp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StepChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
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
CREATE TYPE "message_type" AS ENUM ('text', 'file', 'challenge', 'question_single', 'question_text_field', 'question_sliders');

-- CreateEnum
CREATE TYPE "slider_prop_type" AS ENUM ('negative', 'positive');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_startMessageId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_nextMessageId_fkey";

-- DropForeignKey
ALTER TABLE "InfoPopUp" DROP CONSTRAINT "InfoPopUp_chatMessageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageChoice" DROP CONSTRAINT "MessageChoice_nextMessageId_fkey";

-- DropForeignKey
ALTER TABLE "MessageChoice" DROP CONSTRAINT "MessageChoice_prevMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResultMessageChoice" DROP CONSTRAINT "ResultMessageChoice_messageChoiceId_fkey";

-- DropForeignKey
ALTER TABLE "ResultMessageChoice" DROP CONSTRAINT "ResultMessageChoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResultSliderProp" DROP CONSTRAINT "ResultSliderProp_sliderPropId_fkey";

-- DropForeignKey
ALTER TABLE "ResultSliderProp" DROP CONSTRAINT "ResultSliderProp_userId_fkey";

-- DropForeignKey
ALTER TABLE "SliderProp" DROP CONSTRAINT "SliderProp_chatMessageId_fkey";

-- DropForeignKey
ALTER TABLE "StepChatMessage" DROP CONSTRAINT "StepChatMessage_chatMessageId_fkey";

-- DropForeignKey
ALTER TABLE "StepChatMessage" DROP CONSTRAINT "StepChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_appleUserId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_googleUserId_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerToReport" DROP CONSTRAINT "_AnswerToReport_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnswerToReport" DROP CONSTRAINT "_AnswerToReport_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTag" DROP CONSTRAINT "_CourseToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CourseToTag" DROP CONSTRAINT "_CourseToTag_B_fkey";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "AppleUser";

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "ChatMessage";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "GoogleUser";

-- DropTable
DROP TABLE "InfoPopUp";

-- DropTable
DROP TABLE "MessageChoice";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "ResultMessageChoice";

-- DropTable
DROP TABLE "ResultSliderProp";

-- DropTable
DROP TABLE "Sentence";

-- DropTable
DROP TABLE "SliderProp";

-- DropTable
DROP TABLE "StepChatMessage";

-- DropTable
DROP TABLE "Subscription";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "CourseStatus";

-- DropEnum
DROP TYPE "CourseType";

-- DropEnum
DROP TYPE "MessageType";

-- DropEnum
DROP TYPE "QuestionsType";

-- DropEnum
DROP TYPE "SentenceType";

-- DropEnum
DROP TYPE "SliderPropType";

-- DropEnum
DROP TYPE "SubscriptionStatus";

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
    "name" TEXT,
    "type" "message_type" NOT NULL,
    "files" TEXT[],
    "timeout" INTEGER DEFAULT 0,
    "is_checkpoint" BOOLEAN NOT NULL DEFAULT false,
    "next_message_id" TEXT,
    "chat_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "slider_props" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "slider_prop_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "chat_message_id" TEXT NOT NULL,

    CONSTRAINT "slider_props_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_choices" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "file" TEXT,
    "prev_message_id" TEXT NOT NULL,
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
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_pop_ups" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "chat_message_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "info_pop_ups_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_google_user_id_key" ON "users"("google_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_apple_user_id_key" ON "users"("apple_user_id");

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
CREATE UNIQUE INDEX "questions_question_key" ON "questions"("question");

-- CreateIndex
CREATE UNIQUE INDEX "questions_name_key" ON "questions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sentences_sentence_key" ON "sentences"("sentence");

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
CREATE UNIQUE INDEX "chats_start_message_id_key" ON "chats"("start_message_id");

-- CreateIndex
CREATE INDEX "chats_start_message_id_idx" ON "chats"("start_message_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_google_user_id_fkey" FOREIGN KEY ("google_user_id") REFERENCES "google_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_apple_user_id_fkey" FOREIGN KEY ("apple_user_id") REFERENCES "apple_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_next_message_id_fkey" FOREIGN KEY ("next_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slider_props" ADD CONSTRAINT "slider_props_chat_message_id_fkey" FOREIGN KEY ("chat_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_choices" ADD CONSTRAINT "message_choices_next_message_id_fkey" FOREIGN KEY ("next_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_choices" ADD CONSTRAINT "message_choices_prev_message_id_fkey" FOREIGN KEY ("prev_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_start_message_id_fkey" FOREIGN KEY ("start_message_id") REFERENCES "chat_messages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "info_pop_ups" ADD CONSTRAINT "info_pop_ups_chat_message_id_fkey" FOREIGN KEY ("chat_message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "_AnswerToReport" ADD CONSTRAINT "_AnswerToReport_A_fkey" FOREIGN KEY ("A") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnswerToReport" ADD CONSTRAINT "_AnswerToReport_B_fkey" FOREIGN KEY ("B") REFERENCES "reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTag" ADD CONSTRAINT "_CourseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToTag" ADD CONSTRAINT "_CourseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
