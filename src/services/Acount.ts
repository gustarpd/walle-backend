import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getBalance(id: string) {
  return await prisma.account.findUnique({
     where: {
        id
     }
  })
}
