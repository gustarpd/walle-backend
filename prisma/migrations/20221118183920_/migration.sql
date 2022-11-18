/*
  Warnings:

  - You are about to drop the column `creditedAcconutId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `debitedAcconutId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to alter the column `value` on the `Transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAcconutId_fkey";

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "creditedAcconutId",
DROP COLUMN "debitedAcconutId",
ADD COLUMN     "creditedAccountId" TEXT,
ADD COLUMN     "debitedAccountId" TEXT,
ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
