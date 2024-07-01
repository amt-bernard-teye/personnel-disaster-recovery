-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "personnels" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "region" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "digitalAddress" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "personnels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personnels_userId_key" ON "personnels"("userId");

-- AddForeignKey
ALTER TABLE "personnels" ADD CONSTRAINT "personnels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
