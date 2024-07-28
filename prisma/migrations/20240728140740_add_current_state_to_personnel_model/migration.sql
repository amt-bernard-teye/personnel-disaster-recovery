/*
  Warnings:

  - Added the required column `currentState` to the `personnels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personnels" ADD COLUMN     "currentState" "State" NOT NULL;
