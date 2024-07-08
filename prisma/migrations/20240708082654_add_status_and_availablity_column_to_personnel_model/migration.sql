/*
  Warnings:

  - Added the required column `image` to the `personnels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PersonnelStatus" AS ENUM ('PENDING', 'APPROVE', 'DISAPPROVE');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "personnels" ADD COLUMN     "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "status" "PersonnelStatus" NOT NULL DEFAULT 'PENDING';
