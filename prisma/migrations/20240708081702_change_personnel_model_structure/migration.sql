/*
  Warnings:

  - You are about to drop the column `nationality` on the `personnels` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `personnels` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "personnels" DROP COLUMN "nationality",
DROP COLUMN "region";
