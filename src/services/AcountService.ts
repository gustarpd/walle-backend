import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface TypeRequest {
  id: string
}

export async function getBalance({ id }: TypeRequest) {
  const AccountBalance = await prisma.account.findFirst({
    where: {
      userId: id,
    },
  })

  const filter = await prisma.transactions.findMany({
    where: {
      creditedAccountId: AccountBalance?.userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { filter, balance: AccountBalance?.balance }
}
