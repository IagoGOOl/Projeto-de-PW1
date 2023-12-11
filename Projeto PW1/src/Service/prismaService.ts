import { PrismaClient } from "@prisma/client";

export const prismaService = new PrismaClient();

async function main() {
  await prismaService.user.create({
    data: {
      name: "Igor ads",
      email: "igor@gmail.com",
      password: "BomNoite",
    },
  });
}

main();
