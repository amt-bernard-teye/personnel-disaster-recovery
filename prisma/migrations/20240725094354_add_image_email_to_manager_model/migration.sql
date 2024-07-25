/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `managers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `managers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "managers_email_key" ON "managers"("email");
