/*
  Warnings:

  - You are about to drop the column `image` on the `personnels` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EmergencyTypeStatus" AS ENUM ('ACTIVE', 'REMOVED');

-- AlterTable
ALTER TABLE "personnels" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "emergency_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "EmergencyTypeStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "emergency_types_pkey" PRIMARY KEY ("id")
);
