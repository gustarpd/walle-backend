import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function SignUpUser(username: string, password: string) {
  const HashPassword = await hash(password, 8);

  const UserExists = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (password.length < 8) {
    return { error: "A senha deve conter pelo menos 8 caracteres" };
  }

  if (username.length < 3) {
    return {
      error: "O nome de usuário deve conter pelo  menos  3 caracteres.",
    };
  }

  if (UserExists) {
    return { error: "usuario já existe tente novamente" };
  }

  let regex = /(?=.*[A-Z])(?=.*[/\d/])/;

  const CheckPassword = regex.test(password);

  if (!CheckPassword) {
    return { error: "A senha deve ter uma letra maiuscula e um numero" };
  }

  if (CheckPassword) {
    const SignUp = await prisma.user.create({
      data: {
        username,
        password: HashPassword,

        Accounts: {
          create: {
            balance: 100,
          },
        },
      },
    });

    return { id: SignUp.id, username: SignUp.username };
  }
}
