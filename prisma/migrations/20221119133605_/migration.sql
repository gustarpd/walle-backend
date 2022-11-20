/*
  Warnings:

  - You are about to drop the column `creditedAcconutId` on the `Transactions` table. All the data in the column will be lost.
  - You are about to drop the column `debitedAcconutId` on the `Transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditedAccountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debitedAccountId` to the `Transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transactions" DROP CONSTRAINT "Transactions_debitedAcconutId_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Transactions" DROP COLUMN "creditedAcconutId",
DROP COLUMN "debitedAcconutId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creditedAccountId" TEXT NOT NULL,
ADD COLUMN     "debitedAccountId" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_debitedAccountId_fkey" FOREIGN KEY ("debitedAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
