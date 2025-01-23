/*
  Warnings:

  - A unique constraint covering the columns `[employee_id]` on the table `bank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bank_employee_id_key" ON "bank"("employee_id");
