import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";
export * from "./error";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// eslint-disable-next-line no-restricted-properties, @typescript-eslint/no-unsafe-assignment
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
