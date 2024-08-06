/*
  Warnings:

  - Made the column `created_at` on table `answers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `answers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `answers_public` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `answers_public` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `campus_survey_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `campus_survey_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `campuses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `campuses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `level_index_on_variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `level_index_on_variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `level_indices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `level_indices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `options` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `public_survey_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `public_survey_logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `public_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `public_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `result_variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `result_variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `results` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `role_on_form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `role_on_form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `role_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `role_users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `url_public_survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `url_public_survey` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `variable_on_form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `variable_on_form_groups` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `variables` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "answers_public" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "campus_survey_logs" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "campuses" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "form_groups" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "level_index_on_variables" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "level_indices" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "options" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "public_survey_logs" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "public_user" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "result_variables" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "results" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "role_on_form_groups" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "role_users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "url_public_survey" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "variable_on_form_groups" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "variables" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
