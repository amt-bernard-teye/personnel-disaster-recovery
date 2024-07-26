/*
  Warnings:

  - You are about to drop the column `currrentPosition` on the `personnnel_profession` table. All the data in the column will be lost.
  - Added the required column `currentPosition` to the `personnnel_profession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "personnnel_profession" DROP COLUMN "currrentPosition",
ADD COLUMN     "currentPosition" "CurrentPosition" NOT NULL;
