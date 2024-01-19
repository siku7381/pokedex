import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

// Use a module-level variable to store the singleton instance
let prismaInstance;

// Export a function to get or create the Prisma instance
export const getPrismaInstance = () => {
    if (!prismaInstance) {
        prismaInstance = prismaClientSingleton();
    }
    return prismaInstance;
};

// Export the Prisma instance directly
export const prisma = getPrismaInstance();

// Assign the Prisma instance to the global object in development
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prisma;
}

// Export db as an alias for prisma
export const db = prisma;
