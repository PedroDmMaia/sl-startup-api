-- DropForeignKey
ALTER TABLE "deduction" DROP CONSTRAINT "deduction_employee_id_fkey";

-- AddForeignKey
ALTER TABLE "deduction" ADD CONSTRAINT "deduction_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
