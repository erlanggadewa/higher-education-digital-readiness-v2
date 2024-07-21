import { PrismaClient } from '@prisma/client';

import { env } from '@/env';
import { enhance } from '@zenstackhq/runtime';

const createPrismaClient = () =>
  new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

// purePrisma is a PrismaClient instance without any runtime enhancements
export const purePrisma = createPrismaClient();

// enhance is a function that wraps the PrismaClient instance with zenstack runtime
export const db = enhance(globalForPrisma.prisma ?? createPrismaClient());

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
