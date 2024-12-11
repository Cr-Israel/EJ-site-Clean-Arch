import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

export function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['query'],
    });
  }
  return prisma;
}

export async function resetPrismaClient() {
  if (prisma) {
    await prisma.$disconnect();
  }
  prisma = new PrismaClient({
    log: ['query'],
  });
}