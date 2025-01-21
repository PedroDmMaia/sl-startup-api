-- DropForeignKey
ALTER TABLE "role" DROP CONSTRAINT "role_employee_id_fkey";

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
