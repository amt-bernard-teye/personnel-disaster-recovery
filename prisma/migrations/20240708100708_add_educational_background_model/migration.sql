-- CreateTable
CREATE TABLE "educational_background" (
    "id" SERIAL NOT NULL,
    "qualification" TEXT NOT NULL,
    "studyField" TEXT NOT NULL,
    "personnelId" INTEGER NOT NULL,

    CONSTRAINT "educational_background_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "educational_background_personnelId_key" ON "educational_background"("personnelId");

-- AddForeignKey
ALTER TABLE "educational_background" ADD CONSTRAINT "educational_background_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "personnels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
