import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function getBalance(id: string ) {
  const AccountBalance = await prisma.account.findFirst({
    where: {
      userId: id,
    },
  })

  const transactions = await prisma.transactions.findMany({
    where: {
      debitedAccountId: id
    },
    orderBy: {
      createdAt: 'asc'
    },
  })

  return { transactions, trasactonCashout: AccountBalance?.id, balance: AccountBalance?.balance }
}
