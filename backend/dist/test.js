"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function testConnection() {
    try {
        // Run a simple query
        await prisma.$queryRaw `SELECT 1`;
        console.log('Prisma connected to MySQL successfully!');
    }
    catch (error) {
        console.error('Prisma connection failed:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
testConnection();
