/*
  Warnings:

  - The `employee_id` column on the `deduction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "deduction" DROP CONSTRAINT "deduction_employee_id_fkey";

-- AlterTable
ALTER TABLE "deduction" DROP COLUMN "employee_id",
ADD COLUMN     "employee_id" TEXT[];

-- AddForeignKey
ALTER TABLE "deduction" ADD CONSTRAINT "deduction_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
