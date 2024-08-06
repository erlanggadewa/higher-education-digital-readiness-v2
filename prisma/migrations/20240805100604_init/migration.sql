/*
  Warnings:

  - Made the column `result_id` on table `result_variables` required. This step will fail if there are existing NULL values in that column.
  - Made the column `campus_id` on table `results` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "result_variables" DROP CONSTRAINT "result_variables_result_id_fkey";

-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_campus_id_fkey";

-- AlterTable
ALTER TABLE "result_variables" ALTER COLUMN "result_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "results" ALTER COLUMN "campus_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_campus_id_fkey" FOREIGN KEY ("campus_id") REFERENCES "campuses"("campus_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result_variables" ADD CONSTRAINT "result_variables_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
