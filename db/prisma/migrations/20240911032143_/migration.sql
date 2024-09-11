/*
  Warnings:

  - You are about to drop the column `isPublicUser` on the `result_variables` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[campus_id,variable_id,year]` on the table `result_variables` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userType` to the `result_variables` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "result_variables_campus_id_variable_id_year_result_id_key";

-- AlterTable
ALTER TABLE "result_variables" DROP COLUMN "isPublicUser",
ADD COLUMN     "userType" "ResultUserType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "result_variables_campus_id_variable_id_year_key" ON "result_variables"("campus_id", "variable_id", "year");
