/*
  Warnings:

  - You are about to drop the column `payload` on the `url_public_survey` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[role,campus_id,form_group_id,year]` on the table `url_public_survey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campus_id` to the `url_public_survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_group_id` to the `url_public_survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `url_public_survey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `url_public_survey` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "url_public_survey" DROP COLUMN "payload",
ADD COLUMN     "campus_id" TEXT NOT NULL,
ADD COLUMN     "form_group_id" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "url_public_survey_role_campus_id_form_group_id_year_key" ON "url_public_survey"("role", "campus_id", "form_group_id", "year");

-- AddForeignKey
ALTER TABLE "url_public_survey" ADD CONSTRAINT "url_public_survey_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_public_survey" ADD CONSTRAINT "url_public_survey_form_group_id_fkey" FOREIGN KEY ("form_group_id") REFERENCES "form_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "url_public_survey" ADD CONSTRAINT "url_public_survey_role_fkey" FOREIGN KEY ("role") REFERENCES "role_users"("role") ON DELETE RESTRICT ON UPDATE CASCADE;
