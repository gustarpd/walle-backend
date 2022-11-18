import { PrismaClient } from "@prisma/client";
import { useResolvedPath } from "react-router-dom";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: "usuario 1",
      password: "42",
    },
  });

  await prisma.account.create({
    data: {
      balance: "1029.00",
      userId: user.id,

    //   transactionCredited: {
    //     createMany: {
    //       data: {
    //         value: "121",
    //         createdAt: "2022-10-05T14:48:00.000Z",
    //         creditedAcconutId: user.id,
    //       },
    //     },
    //   },
    },
  });
}

main();
