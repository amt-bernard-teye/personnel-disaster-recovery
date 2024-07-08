-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "personnelId" INTEGER NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "personnels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
