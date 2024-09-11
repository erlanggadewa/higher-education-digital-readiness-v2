/*
  Warnings:

  - A unique constraint covering the columns `[campus_id,variable_id,year,result_id]` on the table `result_variables` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[campus_id,year]` on the table `results` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "result_variables_campus_id_variable_id_year_result_id_key" ON "result_variables"("campus_id", "variable_id", "year", "result_id");

-- CreateIndex
CREATE UNIQUE INDEX "results_campus_id_year_key" ON "results"("campus_id", "year");
