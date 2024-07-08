-- CreateTable
CREATE TABLE "professions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emergencyId" INTEGER NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professions" ADD CONSTRAINT "professions_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergency_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
