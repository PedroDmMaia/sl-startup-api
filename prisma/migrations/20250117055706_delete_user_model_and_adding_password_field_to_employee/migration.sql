/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "users";
