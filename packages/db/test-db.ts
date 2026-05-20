import { prisma } from './src/prisma.js';

async function test() {
  try {
    console.log('Testing connection...');
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
