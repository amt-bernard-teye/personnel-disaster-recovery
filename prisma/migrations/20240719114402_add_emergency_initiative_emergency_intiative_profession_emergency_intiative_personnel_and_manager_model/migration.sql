/*
  Warnings:

  - You are about to drop the column `professionId` on the `personnnel_profession` table. All the data in the column will be lost.
  - You are about to drop the column `emergencyId` on the `professions` table. All the data in the column will be lost.
  - Added the required column `profession_id` to the `personnels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- DropForeignKey
ALTER TABLE "personnnel_profession" DROP CONSTRAINT "personnnel_profession_professionId_fkey";

-- DropForeignKey
ALTER TABLE "professions" DROP CONSTRAINT "professions_emergencyId_fkey";

-- AlterTable
ALTER TABLE "emergency_types" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "personnels" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profession_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "personnnel_profession" DROP COLUMN "professionId";

-- AlterTable
ALTER TABLE "professions" DROP COLUMN "emergencyId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "managers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_initiatives" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dispatched_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "emergencyTypeId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "state" "State" NOT NULL,

    CONSTRAINT "emergency_initiatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_profession" (
    "id" SERIAL NOT NULL,
    "professionId" INTEGER NOT NULL,
    "emergencyInitiativeId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "emergency_profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency_initiative_personnel" (
    "id" SERIAL NOT NULL,
    "emergencyInitiativeId" INTEGER NOT NULL,
    "personnelId" INTEGER NOT NULL,

    CONSTRAINT "emergency_initiative_personnel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "personnels" ADD CONSTRAINT "personnels_profession_id_fkey" FOREIGN KEY ("profession_id") REFERENCES "professions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_initiatives" ADD CONSTRAINT "emergency_initiatives_emergencyTypeId_fkey" FOREIGN KEY ("emergencyTypeId") REFERENCES "emergency_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_initiatives" ADD CONSTRAINT "emergency_initiatives_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_profession" ADD CONSTRAINT "emergency_profession_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "professions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_profession" ADD CONSTRAINT "emergency_profession_emergencyInitiativeId_fkey" FOREIGN KEY ("emergencyInitiativeId") REFERENCES "emergency_initiatives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_initiative_personnel" ADD CONSTRAINT "emergency_initiative_personnel_emergencyInitiativeId_fkey" FOREIGN KEY ("emergencyInitiativeId") REFERENCES "emergency_initiatives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency_initiative_personnel" ADD CONSTRAINT "emergency_initiative_personnel_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "personnels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
