import { PrismaClient } from '@prisma/client'
import { compareSync } from 'bcrypt'

const prisma = new PrismaClient()

export async function FindUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ password }, { username }],
    },
  })


  const comparePassword = compareSync(password, user?.password as string)


  return { comparePassword, user: user?.username }
}

