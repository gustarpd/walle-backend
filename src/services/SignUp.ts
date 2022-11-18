import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function SignUpUser(username: string, password: string) {
  const passwordHash = await hash(password, 8)

  const UserExists = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!UserExists) {
    const SignUp = await prisma.user.create({
      data: {
        username,
        password: passwordHash,

        Accounts: {
          create: {
            balance: "100,00",
          },
        },
      },
    });

    return {id: SignUp.id, username: SignUp.username};
  } else {
    return "usuario ja cadastrado";
  }
}
