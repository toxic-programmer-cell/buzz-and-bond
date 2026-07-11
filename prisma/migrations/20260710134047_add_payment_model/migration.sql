-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('RAZORPAY');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('EVENT', 'MEMBERSHIP');

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "provider" "PaymentProvider" NOT NULL DEFAULT 'RAZORPAY',
    "purpose" "PaymentPurpose" NOT NULL,
    "orderId" TEXT NOT NULL,
    "paymentId" TEXT,
    "signature" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "referenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");
