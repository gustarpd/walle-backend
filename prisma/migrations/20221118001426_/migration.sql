/*
  Warnings:

  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAcconutId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "debitedAcconutId" DROP NOT NULL,
ALTER COLUMN "creditedAcconutId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitedAcconutId_fkey" FOREIGN KEY ("debitedAcconutId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
