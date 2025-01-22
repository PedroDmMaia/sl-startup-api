/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `benefit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "benefit_name_key" ON "benefit"("name");
