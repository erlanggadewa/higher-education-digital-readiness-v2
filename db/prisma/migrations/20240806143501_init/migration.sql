/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `answers_public` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_campus_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_option_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_question_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_revision_option_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_public" DROP CONSTRAINT "answers_public_campus_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_public" DROP CONSTRAINT "answers_public_option_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_public" DROP CONSTRAINT "answers_public_question_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_public" DROP CONSTRAINT "answers_public_revision_option_id_fkey";

-- DropForeignKey
ALTER TABLE "answers_public" DROP CONSTRAINT "answers_public_user_public_id_fkey";

-- DropTable
DROP TABLE "answers";

-- DropTable
DROP TABLE "answers_public";

-- CreateTable
CREATE TABLE "campus_answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "revision_option_id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "answer_status" "AnswerStatus" NOT NULL DEFAULT 'WAITING',
    "review_comment" TEXT,
    "review_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campus_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "revision_option_id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "user_public_id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "answer_status" "AnswerStatus" NOT NULL DEFAULT 'WAITING',
    "review_comment" TEXT,
    "review_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "public_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "campus_answers_question_id_campus_id_year_key" ON "campus_answers"("question_id", "campus_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "public_answers_question_id_user_public_id_campus_id_year_key" ON "public_answers"("question_id", "user_public_id", "campus_id", "year");

-- AddForeignKey
ALTER TABLE "campus_answers" ADD CONSTRAINT "campus_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_answers" ADD CONSTRAINT "campus_answers_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_answers" ADD CONSTRAINT "campus_answers_revision_option_id_fkey" FOREIGN KEY ("revision_option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_answers" ADD CONSTRAINT "campus_answers_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_answers" ADD CONSTRAINT "public_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_answers" ADD CONSTRAINT "public_answers_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_answers" ADD CONSTRAINT "public_answers_revision_option_id_fkey" FOREIGN KEY ("revision_option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_answers" ADD CONSTRAINT "public_answers_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_answers" ADD CONSTRAINT "public_answers_user_public_id_fkey" FOREIGN KEY ("user_public_id") REFERENCES "public_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
