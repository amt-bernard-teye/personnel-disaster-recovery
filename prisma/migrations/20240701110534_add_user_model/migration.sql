-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PERSONNEL');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('VERIFIED', 'PENDING', 'SUSPENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "accountStatus" "AccountStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
