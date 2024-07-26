/*
  Warnings:

  - The primary key for the `personnnel_profession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employee_id` on the `personnnel_profession` table. All the data in the column will be lost.
  - You are about to drop the column `employer_email` on the `personnnel_profession` table. All the data in the column will be lost.
  - You are about to drop the column `employer_name` on the `personnnel_profession` table. All the data in the column will be lost.
  - Added the required column `employeeId` to the `personnnel_profession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerEmail` to the `personnnel_profession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employerName` to the `personnnel_profession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personnnel_profession" DROP CONSTRAINT "personnnel_profession_pkey",
DROP COLUMN "employee_id",
DROP COLUMN "employer_email",
DROP COLUMN "employer_name",
ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "employerEmail" TEXT NOT NULL,
ADD COLUMN     "employerName" TEXT NOT NULL,
ADD CONSTRAINT "personnnel_profession_pkey" PRIMARY KEY ("employeeId");
