import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function FilterByDate(id: string, datefilter: any ) {

  const filter = await prisma.transactions.findMany({
    where: {
      debitedAccountId: id
    },
    orderBy: {
      createdAt: datefilter === 'asc' ? 'asc' : 'desc'
    },
  })

  return { filter }
}
