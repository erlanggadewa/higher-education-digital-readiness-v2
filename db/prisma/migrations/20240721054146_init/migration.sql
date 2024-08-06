-- CreateEnum
CREATE TYPE "AnswerStatus" AS ENUM ('APPROVED', 'REJECTED', 'WAITING');

-- CreateEnum
CREATE TYPE "ResultUserType" AS ENUM ('PUBLIC', 'CAMPUS');

-- CreateEnum
CREATE TYPE "SurveyLogStatus" AS ENUM ('WAITING', 'REVIEWED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "option_id" TEXT NOT NULL,
    "revision_option_id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "answer_status" "AnswerStatus" NOT NULL DEFAULT 'WAITING',
    "review_comment" TEXT,
    "review_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers_public" (
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
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "answers_public_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campuses" (
    "campus_id" TEXT NOT NULL,
    "code_pt" TEXT NOT NULL,
    "status_pt" BOOLEAN NOT NULL,
    "accreditation_pt" TEXT NOT NULL,
    "standing_date" TIMESTAMP(3) NOT NULL,
    "number_sk_pt" TEXT NOT NULL,
    "date_sk_pt" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "faximile" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "campuses_pkey" PRIMARY KEY ("campus_id")
);

-- CreateTable
CREATE TABLE "public_user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "identify_number" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "public_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "point" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "variable_on_form_group_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "year" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "form_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "results" (
    "id" TEXT NOT NULL,
    "campus_id" TEXT,
    "result" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "result_variables" (
    "id" TEXT NOT NULL,
    "result_id" TEXT,
    "variable_id" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "campus_id" TEXT NOT NULL,
    "is_approved" BOOLEAN NOT NULL DEFAULT false,
    "year" TEXT NOT NULL,
    "isPublicUser" "ResultUserType" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "result_variables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variables" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "variables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_index_on_variables" (
    "id" TEXT NOT NULL,
    "variable_id" TEXT NOT NULL,
    "level_index" TEXT NOT NULL,
    "description_level_variable" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "level_index_on_variables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "level_indices" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "min_point" DOUBLE PRECISION NOT NULL,
    "max_point" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "level_indices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_users" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_number_type" TEXT,
    "is_participant" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "role_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_on_form_groups" (
    "id" TEXT NOT NULL,
    "form_group_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "role_on_form_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variable_on_form_groups" (
    "id" TEXT NOT NULL,
    "variable_id" TEXT NOT NULL,
    "form_group_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "variable_on_form_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campus_survey_logs" (
    "id" TEXT NOT NULL,
    "campus_id" TEXT NOT NULL,
    "variable_on_form_group_id" TEXT NOT NULL,
    "status" "SurveyLogStatus" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "campus_survey_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_survey_logs" (
    "id" TEXT NOT NULL,
    "public_user_id" TEXT NOT NULL,
    "variable_on_form_group_id" TEXT NOT NULL,
    "status" "SurveyLogStatus" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "public_survey_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "url_public_survey" (
    "id" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "url_public_survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "answers_question_id_campus_id_year_key" ON "answers"("question_id", "campus_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "answers_public_question_id_user_public_id_campus_id_year_key" ON "answers_public"("question_id", "user_public_id", "campus_id", "year");

-- CreateIndex
CREATE UNIQUE INDEX "campuses_campus_id_key" ON "campuses"("campus_id");

-- CreateIndex
CREATE UNIQUE INDEX "campuses_code_pt_key" ON "campuses"("code_pt");

-- CreateIndex
CREATE UNIQUE INDEX "variables_alias_key" ON "variables"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "role_users_role_key" ON "role_users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "role_on_form_groups_role_form_group_id_key" ON "role_on_form_groups"("role", "form_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "variable_on_form_groups_form_group_id_variable_id_key" ON "variable_on_form_groups"("form_group_id", "variable_id");

-- CreateIndex
CREATE UNIQUE INDEX "campus_survey_logs_campus_id_variable_on_form_group_id_key" ON "campus_survey_logs"("campus_id", "variable_on_form_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "public_survey_logs_public_user_id_variable_on_form_group_id_key" ON "public_survey_logs"("public_user_id", "variable_on_form_group_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_fkey" FOREIGN KEY ("role") REFERENCES "role_users"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_revision_option_id_fkey" FOREIGN KEY ("revision_option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_public" ADD CONSTRAINT "answers_public_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_public" ADD CONSTRAINT "answers_public_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_public" ADD CONSTRAINT "answers_public_revision_option_id_fkey" FOREIGN KEY ("revision_option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_public" ADD CONSTRAINT "answers_public_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers_public" ADD CONSTRAINT "answers_public_user_public_id_fkey" FOREIGN KEY ("user_public_id") REFERENCES "public_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campuses" ADD CONSTRAINT "campuses_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_user" ADD CONSTRAINT "public_user_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_user" ADD CONSTRAINT "public_user_role_fkey" FOREIGN KEY ("role") REFERENCES "role_users"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_variable_on_form_group_id_fkey" FOREIGN KEY ("variable_on_form_group_id") REFERENCES "variable_on_form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_variables" ADD CONSTRAINT "result_variables_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_variables" ADD CONSTRAINT "result_variables_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "variables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_variables" ADD CONSTRAINT "result_variables_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_index_on_variables" ADD CONSTRAINT "level_index_on_variables_level_index_fkey" FOREIGN KEY ("level_index") REFERENCES "level_indices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "level_index_on_variables" ADD CONSTRAINT "level_index_on_variables_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "variables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_on_form_groups" ADD CONSTRAINT "role_on_form_groups_form_group_id_fkey" FOREIGN KEY ("form_group_id") REFERENCES "form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_on_form_groups" ADD CONSTRAINT "role_on_form_groups_role_fkey" FOREIGN KEY ("role") REFERENCES "role_users"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable_on_form_groups" ADD CONSTRAINT "variable_on_form_groups_variable_id_fkey" FOREIGN KEY ("variable_id") REFERENCES "variables"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable_on_form_groups" ADD CONSTRAINT "variable_on_form_groups_form_group_id_fkey" FOREIGN KEY ("form_group_id") REFERENCES "form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_survey_logs" ADD CONSTRAINT "campus_survey_logs_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campus_survey_logs" ADD CONSTRAINT "campus_survey_logs_variable_on_form_group_id_fkey" FOREIGN KEY ("variable_on_form_group_id") REFERENCES "variable_on_form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_survey_logs" ADD CONSTRAINT "public_survey_logs_public_user_id_fkey" FOREIGN KEY ("public_user_id") REFERENCES "public_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_survey_logs" ADD CONSTRAINT "public_survey_logs_variable_on_form_group_id_fkey" FOREIGN KEY ("variable_on_form_group_id") REFERENCES "variable_on_form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
