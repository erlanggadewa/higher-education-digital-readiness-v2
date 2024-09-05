/*
  Warnings:

  - You are about to drop the column `year` on the `campus_answers` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `public_answers` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `public_users` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `result_variables` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[question_id,campus_id]` on the table `campus_answers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[question_id,user_public_id,campus_id]` on the table `public_answers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "campus_answers_question_id_campus_id_year_key";

-- DropIndex
DROP INDEX "public_answers_question_id_user_public_id_campus_id_year_key";

-- AlterTable
ALTER TABLE "campus_answers" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "public_answers" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "public_users" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "year";

-- AlterTable
ALTER TABLE "result_variables" DROP COLUMN "year";

-- CreateIndex
CREATE UNIQUE INDEX "campus_answers_question_id_campus_id_key" ON "campus_answers"("question_id", "campus_id");

-- CreateIndex
CREATE UNIQUE INDEX "public_answers_question_id_user_public_id_campus_id_key" ON "public_answers"("question_id", "user_public_id", "campus_id");
