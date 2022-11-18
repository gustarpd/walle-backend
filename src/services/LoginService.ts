import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function FindUser(username: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
  });

  return { id: user?.id, username: user?.username };
}
