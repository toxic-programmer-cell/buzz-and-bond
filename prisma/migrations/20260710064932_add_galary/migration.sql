-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('EVENTS', 'NETWORKING', 'WORKSHOP', 'SPEAKERS', 'COMMUNITY', 'OTHERS');

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "category" "GalleryCategory" NOT NULL DEFAULT 'EVENTS',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);
