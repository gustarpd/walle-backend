import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function CashOut(
  value: number,
  id: string,
  UserNameCredited: string
) {
  const userdebited = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  const debitedAccount = await prisma.account.findUnique({
    where: {
      userId: id,
    },
  });

  const usercredited = await prisma.user.findFirst({
    where: {
      username: UserNameCredited,
    },
  });

  const creditAcconut = await prisma.account.findFirst({
    where: {
      userId: usercredited?.id,
    },
  });

  if(!value) {
    return { message: 'Digite um valor!' }
  }

  if (Number(value) > Number(debitedAccount?.balance)) {
    return { message: "Valor maior que o saldo" };
  }

  if (usercredited?.id === userdebited?.id) {
    return { message: 'Você não pode transferir para si mesmo!' };
  }

  if (!usercredited?.id) {
    return { error: "Não encontramos este usuário" };
  }

  if (
    usercredited?.username !== userdebited?.username &&
    Number(debitedAccount?.balance) >= Number(value)
  ) {
    const transaction = await prisma.transactions.create({
      data: {
        value: String(value),
        creditedAccountId: usercredited?.id as string,
        debitedAccountId: debitedAccount?.id,
      },
    });

    await prisma.account.update({
      where: {
        userId: userdebited?.id,
      },
      data: {
        balance: Number(debitedAccount?.balance) - Number(value),
      },
    });

    await prisma.account.update({
      where: {
        userId: usercredited?.id,
      },
      data: {
        balance: Number(creditAcconut?.balance) + Number(value),
      },
    });

    return { transaction };
  }
}
