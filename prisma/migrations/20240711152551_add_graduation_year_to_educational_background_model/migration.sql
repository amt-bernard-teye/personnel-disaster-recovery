/*
  Warnings:

  - Added the required column `graduation_year` to the `educational_background` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "educational_background" ADD COLUMN     "graduation_year" INTEGER NOT NULL;
