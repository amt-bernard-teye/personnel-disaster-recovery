-- CreateEnum
CREATE TYPE "CurrentPosition" AS ENUM ('JUNIOR', 'ASSOCIATE', 'EXPERT');

-- CreateTable
CREATE TABLE "personnnel_profession" (
    "employee_id" TEXT NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "employer_name" TEXT NOT NULL,
    "employer_email" TEXT NOT NULL,
    "personnelId" INTEGER NOT NULL,
    "professionId" INTEGER NOT NULL,
    "currrentPosition" "CurrentPosition" NOT NULL,

    CONSTRAINT "personnnel_profession_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personnnel_profession_personnelId_key" ON "personnnel_profession"("personnelId");

-- AddForeignKey
ALTER TABLE "personnnel_profession" ADD CONSTRAINT "personnnel_profession_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "personnels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personnnel_profession" ADD CONSTRAINT "personnnel_profession_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "professions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
