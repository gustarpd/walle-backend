import { PrismaClient } from "@prisma/client";
import { response } from "express";

const prisma = new PrismaClient();

export async function CashOut(
  value: number,
  id: string,
  UserNameCredited: string
) {
  const userDebited = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  const userCredited = await prisma.user.findUnique({
    where: {
      id: UserNameCredited,
    },
  });

  if(!userCredited || !userDebited) {
    return { error: ' Não existe!'  }
  }

  if (userCredited?.username === userDebited?.username) {
    return { error: "Você não pode tranferir pra si mesmo!" };
  } else {
    const transaction = await prisma.transactions.create({
      data: {
        value: value,
        creditedAccountId: UserNameCredited,
        debitedAccountId: id,
      },
    })

    const addindcash = await prisma.account.findFirst({
      where:{
        userId: UserNameCredited
      }
    })

    // const add = await prisma.account.update({
    //   where: {
    //     userId: UserNameCredited,
    //   },
    //   data: {
    //     balance: String(value) + addindcash?.balance
    //   }
    // })

    return {transaction };
  }
}
